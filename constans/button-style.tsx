import { Fonts } from "src/theme/typography";
import { color } from "src/theme/color";

export const ButtonBlockViewStyle = {
  STYLE_1: {
    marginVertical: 15,
    flexDirection: "row",
    // justifyContent: 'center',
    justifyContent: "space-between",
    alignItems: "center",
    // flex: 1,
  },
  STYLE_2: {
    borderRadius: 40,
    paddingLeft: 24,
    paddingRight: 10,
    height: 56,
    maxWidth: 258,
    // width: '100%',
    flexDirection: "row",
    alignItems: "center",
  },
  STYLE_3: {
    ...Fonts.bold_18,
    fontWeight: "700",
    paddingHorizontal: 10,
  },
  STYLE_4: {
    paddingHorizontal: 16,
    height: 40,
    backgroundColor: "#FCA630",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  STYLE_5: {
    ...Fonts.bold_16,
    fontWeight: "700",
  },
  STYLE_6: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
  },
  STYLE_7: {
    borderRadius: 40,
    borderColor: "#FFBF3E",
    borderWidth: 2,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    width: 229,
  },
  STYLE_8: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    width: 180,
    height: 55,
    paddingLeft: 25,
    paddingRight: 10,
    backgroundColor: color.activeButtonInTasks,
  },
  STYLE_9: {
    justifyContent: "center",
    alignItems: "center",
  },
};
