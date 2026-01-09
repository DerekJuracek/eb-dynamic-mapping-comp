import MappingDynamic from "./Mapping/MappingDynamic";
import MappingStaticToDynamic from "./Mapping/MappingStaticToDynamic";
import MappingStaticToPopup from "./Mapping/MappingStaticToPopup";
import type { Article } from "./data/articles";

export default function Mapping({ article, place_id, article_type }: { article: Article, place_id: string, article_type: string }) {
  switch (article.type) {
    case "interactive":
      return <MappingDynamic article={article} place_id={place_id} />;
    case "static-preview":
      return <MappingStaticToDynamic article={article} place_id={place_id} />;
    case "popup":
      return <MappingStaticToPopup article={article} place_id={place_id} />;
    default:
      return null;
  }
}
