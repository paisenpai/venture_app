import { categoryColors } from "../../../utils/Quest Board/questBoardConstants";

const CategoryCircle = memo(({ category }) => (
    <span
        className={`w-7 h-7 rounded-full ${categoryColors[category] || ""} flex-shrink-0`}
        style={!categoryColors[category] ? { backgroundColor: "#909090", fontFamily: "Typold" } : { fontFamily: "Typold" }}
    />
));

export default CategoryCircle;