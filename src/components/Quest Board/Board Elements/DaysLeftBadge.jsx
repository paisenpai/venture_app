import { daysLeftBgColors, getDaysLeftVariant } from "../../../utils/Quest Board/questBoardUtils";

const DaysLeftBadge = memo(({ days = "n", variant }) => {
    const bgVariant = variant || getDaysLeftVariant(Number(days));
    const backgroundColor = daysLeftBgColors[bgVariant] || daysLeftBgColors.blue;
    return (
        <div
            style={{
                padding: "4px 12px",
                backgroundColor,
                borderRadius: 16,
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Typold",
            }}
        >
            <span
                style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 700,
                    fontStyle: "italic",
                    fontFamily: "Typold",
                }}
            >
                {days}{" "}
            </span>
            <span
                style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "Typold",
                }}
            >
                Day(s) Left
            </span>
        </div>
    );
});

export default DaysLeftBadge;