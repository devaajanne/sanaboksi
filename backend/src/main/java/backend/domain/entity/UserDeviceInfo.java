package backend.domain.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDeviceInfo {

  @NotBlank(message = "Device type cannot be null or empty")
  private String deviceType;

  private String os;

  @NotBlank(message = "Browser info cannot be null or empty")
  private String browser;

  @NotNull(message = "Viewport height cannot be null")
  private int viewportHeight;

  @NotNull(message = "Viewport width cannot be null")
  private int viewportWidth;
}
