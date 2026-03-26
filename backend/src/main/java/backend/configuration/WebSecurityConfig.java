package backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Configuration class for setting up web security in the application. Configures CORS settings and
 * CSRF protection.
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

  private final CorsConfig corsConfig;

  public WebSecurityConfig(CorsConfig corsConfig) {
    this.corsConfig = corsConfig;
  }

  /**
   * Configures the {@link SecurityFilterChain} for the application. Configures CORS settings and
   * CSRF protection.
   *
   * @param httpSecurity the {@link HttpSecurity} to configure
   * @return the configured {@link SecurityFilterChain}
   * @throws Exception if an error occurs during configuration
   */
  @Bean
  public SecurityFilterChain configureSecurityFilterChain(HttpSecurity httpSecurity)
      throws Exception {
    httpSecurity
        .cors(cors -> cors.configurationSource(corsConfig.getCorsConfigurationSource()))
        .csrf(
            csrf -> csrf.ignoringRequestMatchers("/api/fixed-letters/*/*/*", "/api/validation/*"));

    return httpSecurity.build();
  }
}
