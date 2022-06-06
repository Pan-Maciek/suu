package com.jhipster.demo.notification.config;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.DefaultSingletonBeanRegistry;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.test.context.ContextConfigurationAttributes;
import org.springframework.test.context.ContextCustomizer;
import org.springframework.test.context.ContextCustomizerFactory;

public class TestContainersSpringContextCustomizerFactory implements ContextCustomizerFactory {

    private Logger log = LoggerFactory.getLogger(TestContainersSpringContextCustomizerFactory.class);
    private static MongoDbTestContainer mongoDbBean;

    @Override
    public ContextCustomizer createContextCustomizer(Class<?> testClass, List<ContextConfigurationAttributes> configAttributes) {
        return (context, mergedConfig) -> {
            ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
            TestPropertyValues testValues = TestPropertyValues.empty();
            EmbeddedMongo mongoAnnotation = AnnotatedElementUtils.findMergedAnnotation(testClass, EmbeddedMongo.class);
            if (null != mongoAnnotation) {
                log.debug("detected the EmbeddedMongo annotation on class {}", testClass.getName());
                if (mongoDbBean == null) {
                    log.info("Warming up the mongo database");
                    mongoDbBean = new MongoDbTestContainer();
                    beanFactory.initializeBean(mongoDbBean, MongoDbTestContainer.class.getName().toLowerCase());
                    beanFactory.registerSingleton(MongoDbTestContainer.class.getName().toLowerCase(), mongoDbBean);
                    ((DefaultSingletonBeanRegistry) beanFactory).registerDisposableBean(
                            MongoDbTestContainer.class.getName().toLowerCase(),
                            mongoDbBean
                        );
                }
                testValues = testValues.and("spring.data.mongodb.uri=" + mongoDbBean.getMongoDBContainer().getReplicaSetUrl());
            }

            testValues.applyTo(context);
        };
    }
}
