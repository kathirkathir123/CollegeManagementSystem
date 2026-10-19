package com.project.student_record_management.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Serves the React single-page app that is built into classpath:/static.
 *
 * React Router handles URLs such as /students or /fees in the browser. When
 * someone refreshes the page or opens such a link directly, the request reaches
 * Spring first, so single-segment paths without a dot are forwarded to
 * index.html. API calls (/api/...) have more than one segment and files like
 * /favicon.ico or /manifest.json contain a dot, so neither is affected.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{path:[\\w-]+}").setViewName("forward:/index.html");
    }
}
