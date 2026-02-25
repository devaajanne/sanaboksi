import {
  Grid,
  Container,
  Title,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSunMoon, IconInfoCircle } from "@tabler/icons-react";
import { useContext } from "react";
import { ColorPaletteContext } from "../context/ColorPaletteContext";

export default function Header() {
  const colorPalette = useContext(ColorPaletteContext);
  const { toggleColorScheme } = useMantineColorScheme();
  const { marginTop, headerGutter, iconSize, iconStrokeWidth } = {
    marginTop: 20,
    headerGutter: "clamp(20px, 12vw, 200px)",
    iconSize: "clamp(20px, 6vw, 35px)",
    iconStrokeWidth: 2,
  };

  return (
    <Container fluid style={{ marginTop: marginTop }}>
      <Grid align="center" gutter={headerGutter}>
        <Grid.Col
          span={4}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <ActionIcon
            variant="subtle"
            size={iconSize}
            styles={{
              root: {
                backgroundColor: colorPalette[0],
                color: colorPalette[2],
              },
            }}
          >
            <IconInfoCircle size={iconSize} strokeWidth={iconStrokeWidth} />
          </ActionIcon>
        </Grid.Col>
        <Grid.Col
          span={4}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Title c={colorPalette[2]}>Sanaboksi</Title>
        </Grid.Col>
        <Grid.Col
          span={4}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ActionIcon
            variant="subtle"
            size={iconSize}
            onClick={() => toggleColorScheme()}
            styles={{
              root: {
                backgroundColor: colorPalette[0],
                color: colorPalette[2],
              },
            }}
          >
            <IconSunMoon size={iconSize} strokeWidth={iconStrokeWidth} />
          </ActionIcon>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
