import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Fonts } from "src/theme/typography";
import { color } from "src/theme/color";
import { observer } from "mobx-react";
import { useStore } from "src/hooks/use-store";
import { Perk, perkCategories } from "src/stores/task-store";
import { PerkInfo } from "./components/good-info";
import { PerkDetails } from "./components/good-details";
import { PanWrap } from "../pan-wrap";
import { Icon } from "react-native-elements";
import { IconsMap } from "src/components/point-icon/icons";

import { ContractDescrViewStyle } from "./constans/contract-descr-style";
//*

const styleLabelContainer: ViewStyle = {
  width: 85,
  height: 34,
  backgroundColor: "#FF8F2A",
  borderRadius: 24,

  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",

  paddingHorizontal: 12,
};

const ICON_CNTR: ViewStyle = {
  marginLeft: 19,
};

const ContractDescr = observer(({ perk }: { perk: Perk }) => {
  const store = useStore();
  const insufficient = (store.auth.balance || 0) <= perk.value;
  const insufficientStyle = insufficient ? "transparent" : color.perksPrimary;
  const insufficientStyleColor = insufficient
    ? color.secondaryDarkBlue
    : color.white;

  return (
    <>
      <ImageBackground
        source={perk.image}
        style={{
          width: "100%",
          height: 387,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginTop: 16,
        }}
        imageStyle={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <View style={ContractDescrViewStyle.STYLE_1}>
          <View style={ContractDescrViewStyle.STYLE_2}>
            <View style={ContractDescrViewStyle.STYLE_3}>
              <Text style={ContractDescrViewStyle.STYLE_4}>
                {perkCategories.get(perk.category).caption}
              </Text>
            </View>
            <IconsMap.ShareIcon color={color.secondaryBlue} />
          </View>
        </View>
      </ImageBackground>
      <View style={ContractDescrViewStyle.STYLE_5}>
        <PerkInfo perk={perk} />
        <View style={ContractDescrViewStyle.STYLE_6}>
          <TouchableOpacity
            onPress={() => insufficient === false && perk.buy()}
            style={{
              backgroundColor: insufficientStyle,
              ...ContractDescrViewStyle.STYLE_7,
            }}
          >
            <View style={styleLabelContainer}>
              <Text style={Fonts.bold_18}>{perk.value} Px (€)</Text>
            </View>
            {!insufficient && (
              <Icon
                name={"payment"}
                size={19}
                color={color.white}
                containerStyle={ICON_CNTR}
              />
            )}
            <Text
              style={{
                color: insufficientStyleColor,
                ...ContractDescrViewStyle.STYLE_8,
              }}
            >
              {insufficient ? "Not enough Px" : "Buy this item"}
            </Text>
            {insufficient && (
              <Icon
                name={"info"}
                color={color.secondaryDarkBlue}
                size={19}
                containerStyle={ICON_CNTR}
              />
            )}
          </TouchableOpacity>
        </View>
        <PerkDetails perk={perk} />
      </View>
    </>
  );
});
//*/
export const PerkDetailPan = observer(({ perk }: { perk: Perk }) => {
  return <PanWrap renderContent={() => <ContractDescr contract={perk} />} />;
});
