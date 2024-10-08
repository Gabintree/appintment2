package aphamale.project.appointment.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        
        corsRegistry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000", "https://web-appointment2react-m1gego797556415b.sel4.cloudtype.app");
    }
    
}
