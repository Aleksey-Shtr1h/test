import { Fonts } from "src/theme/typography";
import { color } from "src/theme/color";

export const ContractDescrViewStyle = {
  STYLE_1: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    height: "100%",
    justifyContent: "space-between",
  },
  STYLE_2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  STYLE_3: {
    backgroundColor: color.secondaryDarkGray,
    borderRadius: 20,
    height: 26,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  STYLE_4: {
    ...Fonts.reg_12,
    fontWeight: "600",
    color: color.secondaryDarkBlue,
  },
  STYLE_5: { backgroundColor: color.secondaryDarkGray },
  STYLE_6: {
    marginTop: -15,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  STYLE_7: {
    borderRadius: 40,
    paddingLeft: 24,
    paddingRight: 10,
    height: 56,
    maxWidth: 258,
    // width: '100%',
    flexDirection: "row",
    alignItems: "center",
  },
  STYLE_8: {
    fontFamily: "Helvetica",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "bold",
    fontStyle: "normal",
    marginLeft: 19,
  },
};
