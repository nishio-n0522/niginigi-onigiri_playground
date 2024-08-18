import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ブレークポイントの型定義
type CustomBreakpoint = "mobile" | "tablet" | "laptop" | "desktop";

// クエリタイプの型定義
type QueryType = "up" | "down" | "between" | "only";

export function useResponsive(
  query: QueryType,
  start: CustomBreakpoint,
  end?: CustomBreakpoint
): boolean {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));
  const mediaDown = useMediaQuery(theme.breakpoints.down(start));
  const mediaBetween = end
    ? useMediaQuery(theme.breakpoints.between(start, end))
    : false;
  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  if (query === "up") {
    return mediaUp;
  }

  if (query === "down") {
    return mediaDown;
  }

  if (query === "between") {
    return mediaBetween;
  }

  return mediaOnly;
}
