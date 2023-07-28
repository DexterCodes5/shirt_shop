package dev.dex.springbootshirtshop.security;

import dev.dex.springbootshirtshop.entity.*;
import org.springframework.context.annotation.*;
import org.springframework.data.rest.core.config.*;
import org.springframework.data.rest.webmvc.config.*;
import org.springframework.http.*;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {
    private String[] allowedOrigin = {"http://localhost:3000", "http://localhost:3001"};

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unsupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH};

        config.exposeIdsFor(Shirt.class);
        disableHttpMethods(Shirt.class, config, unsupportedActions);

        config.exposeIdsFor(Review.class);
        disableHttpMethods(Review.class, config, unsupportedActions);

        config.exposeIdsFor(Address.class);
        disableHttpMethods(Address.class, config, unsupportedActions);

        config.exposeIdsFor(CustomerOrder.class);
        disableHttpMethods(CustomerOrder.class, config, unsupportedActions);

        config.exposeIdsFor(Question.class);
        disableHttpMethods(Question.class, config, unsupportedActions);

        /* Configure CORS Mapping */
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(allowedOrigin);

        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
    }

    private void disableHttpMethods(Class clazz, RepositoryRestConfiguration config, HttpMethod[] unsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(clazz)
                .withItemExposure((metadata, httpMethods) ->
                        httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metadata, httpMethods) ->
                        httpMethods.disable(unsupportedActions));
    }
}
