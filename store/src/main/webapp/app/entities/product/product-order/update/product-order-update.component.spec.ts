import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProductOrderService } from '../service/product-order.service';
import { IProductOrder, ProductOrder } from '../product-order.model';

import { ProductOrderUpdateComponent } from './product-order-update.component';

describe('ProductOrder Management Update Component', () => {
  let comp: ProductOrderUpdateComponent;
  let fixture: ComponentFixture<ProductOrderUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let productOrderService: ProductOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProductOrderUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ProductOrderUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProductOrderUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    productOrderService = TestBed.inject(ProductOrderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const productOrder: IProductOrder = { id: 456 };

      activatedRoute.data = of({ productOrder });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(productOrder));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProductOrder>>();
      const productOrder = { id: 123 };
      jest.spyOn(productOrderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: productOrder }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(productOrderService.update).toHaveBeenCalledWith(productOrder);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProductOrder>>();
      const productOrder = new ProductOrder();
      jest.spyOn(productOrderService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: productOrder }));
      saveSubject.complete();

      // THEN
      expect(productOrderService.create).toHaveBeenCalledWith(productOrder);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProductOrder>>();
      const productOrder = { id: 123 };
      jest.spyOn(productOrderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(productOrderService.update).toHaveBeenCalledWith(productOrder);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
