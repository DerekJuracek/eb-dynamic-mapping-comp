import MappingDynamic from "./Mapping/MappingDynamic";
import MappingStaticToDynamic from "./Mapping/MappingStaticToDynamic";
import MappingStaticToPopup from "./Mapping/MappingStaticToPopup";
import type { Article } from "./data/articles";

export default function Mapping({ article }: { article: Article }) {
  switch (article.type) {
    case "interactive":
      return <MappingDynamic article={article} />;
    case "static-preview":
      return <MappingStaticToDynamic article={article} />;
    case "popup":
      return <MappingStaticToPopup article={article} />;
    default:
      return null;
  }
}
