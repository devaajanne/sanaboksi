package backend.configuration;

import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/** Configuration class for setting up CORS (Cross-Origin Resource Sharing) in the application. */
@Configuration
public class CorsConfig {

  /** The allowed origin for CORS requests, injected from application properties. */
  @Value("${CorsAllowedOrigin}")
  private String corsAllowedOrigin;

  /**
   * Creates and configures a {@link CorsConfigurationSource} bean for CORS settings. Allows only
   * specified origins, methods, and headers.
   *
   * @return the configured {@link CorsConfigurationSource}
   */
  @Bean
  public CorsConfigurationSource getCorsConfigurationSource() {
    CorsConfiguration corsConfig = new CorsConfiguration();
    corsConfig.setAllowedOrigins(List.of(corsAllowedOrigin));
    corsConfig.setAllowedMethods(List.of("GET", "POST"));
    corsConfig.setAllowedHeaders(List.of("Content-Type", "Accept", "Origin"));

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfig);

    return source;
  }
}
