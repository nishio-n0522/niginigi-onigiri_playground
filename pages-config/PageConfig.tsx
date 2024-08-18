import { Home } from "@mui/icons-material";
import { SpeechToTextIcon } from "../assets/SpeechToTextIcon";
import { Url } from "next/dist/shared/lib/router/router";

interface EachPageType {
  pageName: string;
  description: string;
  to: string;
  icon: JSX.Element;
}

export const pageConfig: Array<EachPageType> = [
  {
    pageName: "home",
    description: "appのほーむ",
    to: "/",
    icon: <Home />,
  },
  {
    pageName: "speech-to-text",
    description: "音声をテキストにする機能",
    to: "/speech-to-text",
    icon: <SpeechToTextIcon />,
  },
];
