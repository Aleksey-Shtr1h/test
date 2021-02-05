import React from "react";

import {
  Text,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  Share,
  ImageBackground,
} from "react-native";

import dayjs from "dayjs";
import { color } from "src/theme/color";
import { Fonts } from "src/theme/typography";
import { observer } from "mobx-react";
import { IconsMap } from "src/components/point-icon/icons";
import { useStore } from "src/hooks/use-store";
import {
  Task,
  Perk,
  taskCategories,
  TaskQuestions,
  TaskAB,
  TaskRate,
  perkCategories,
} from "src/stores/task-store";
import { PanWrap } from "./pan-wrap";
import { RoundView } from "../components/round-view";
import { CreatorDescr, CreatorImage } from "./creator-pan";
import { useLang } from "src/hooks/use-lang";
import { Icons } from "src/components/point-icon/icons";
import { HeaderTabsEnum } from "src/stores/ui-store";
import { limitString } from "src/utils/funcs";

import { ButtonBlockViewStyle } from "./constans/button-style";
import { ContractDescr2ViewStyle } from "./constans/contract-descr2-style";

const captionLimit = 30;

const styleTaskDetailsContainer: ViewStyle = {
  width: "100%",
  paddingVertical: 30,
  borderBottomWidth: 1,
  borderBottomColor: color.border,
};

const styleTaskValueText: TextStyle = {
  ...Fonts.bold_18,
  fontWeight: "700",
  color: color.textLight,
};

const styleCryptoCurrencyText: TextStyle = {
  ...Fonts.bold_18,
  fontWeight: "700",
  color: color.textLight,
  marginHorizontal: 4,
};

const styleCurrencyText: TextStyle = {
  ...Fonts.bold_18,
  fontWeight: "700",
  color: color.textLight,
};

const styleTaskDescrHeader: TextStyle = {
  ...Fonts.semi_16,
  fontWeight: "700",
  color: color.secondaryHeader,
  paddingTop: 20,
};

const styleTaskDescr: TextStyle = {
  ...Fonts.semi_16,
  textAlign: "left",
  marginTop: 10,
  lineHeight: 25,
  paddingRight: 38,
  color: color.allText,
};

// TODO: not done yet
const styleCompletedText: TextStyle = {
  ...Fonts.bold_18,
  color: "#FFBF3E",
  fontWeight: "700",
};

const ButtonBlock = observer(({ contract }: { contract: Task | Perk }) => {
  const store = useStore();
  const lang = useLang();
  if (contract instanceof Perk) {
    const insufficient = (store.auth.balance || 0) <= contract.value;

    const insufficientStyle = insufficient ? "transparent" : color.perksPrimary;
    const insufficientStyleColor = insufficient
      ? color.secondaryDarkBlue
      : color.white;
    return (
      <View style={ButtonBlockViewStyle.STYLE_1}>
        <TouchableOpacity
          onPress={() => insufficient === false && contract.buy()}
          style={{
            backgroundColor: insufficientStyle,
            ...ButtonBlockViewStyle.STYLE_2,
          }}
        >
          <IconsMap.Buy width={24} height={24} />
          <Text
            style={{
              color: insufficientStyleColor,
              ...ButtonBlockViewStyle.STYLE_3,
            }}
          >
            {insufficient ? "Not enough Px" : "Buy item"}
          </Text>
          <View style={ButtonBlockViewStyle.STYLE_4}>
            <Text style={ButtonBlockViewStyle.STYLE_5}>
              {contract.value} Px (€)
            </Text>
          </View>
          {/* {insufficient && <Icon name={'info'} color={color.secondaryDarkBlue} size={19} containerStyle={ICON_CNTR} />} */}
        </TouchableOpacity>
        <TouchableOpacity
          // TODO: DRY
          onPress={() =>
            Share.share({
              title: "Hi",
              message: "Test message",
            })
          }
          style={{ marginLeft: 25 }}
        >
          <IconsMap.ShareIcon />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={ButtonBlockViewStyle.STYLE_6}>
      {contract.complete ? (
        <View style={ButtonBlockViewStyle.STYLE_7}>
          <Text style={styleCompletedText}>{lang.task_completed}</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={() => store.ui.openTaskProgress(contract)}>
          <View style={ButtonBlockViewStyle.STYLE_8}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
              }}
            >
              <Text style={styleTaskValueText}>+{contract.value}</Text>
              <Text style={styleCryptoCurrencyText}>
                {lang.crypto_currency}
              </Text>
              <Text style={styleCurrencyText}>({lang.euro_currency})</Text>
            </View>
            <RoundView
              bgColor={color.white}
              style={ButtonBlockViewStyle.STYLE_9}
              size={36}
            >
              <Icons.ArrowRight
                color={color.activeButtonInTasks}
                width={10}
                height={19}
                strokeWidth={2}
              />
            </RoundView>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() =>
          Share.share({
            title: "Hi",
            message: "Test message",
          })
        }
        style={{ marginLeft: 25 }}
      >
        <IconsMap.ShareIcon />
      </TouchableOpacity>
    </View>
  );
});

export const ContractDescr2 = observer(
  ({ contract }: { contract: Task | Perk }) => {
    const store = useStore();
    const lang = useLang();
    // const category = taskCategories.get(contract.category)
    const itemsLeft = Math.floor(contract.totalAmount - contract.resultsAmount);
    let percentLeft = 1 - contract.resultsAmount / contract.totalAmount;
    if (percentLeft < 0 || percentLeft > 1) percentLeft = 0; // TODO: validate data and then remove
    let acc_color = "#7DE187";
    if (percentLeft < 0.5) acc_color = "orange";
    if (percentLeft < 0.2) acc_color = "red";

    const hasContractId = store.perk._favorites.has(contract.id);

    const backroundStyle = hasContractId
      ? color.perksPrimary
      : color.secondaryBackground;

    const colorStyle = hasContractId
      ? color.secondaryBackground
      : color.perksPrimary;

    return (
      <>
        <View style={ContractDescr2ViewStyle.STYLE_1}>
          {contract instanceof Perk && (
            <ImageBackground
              source={contract.image}
              style={{
                height: 387,
              }}
              imageStyle={{
                borderRadius: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => store.perk.toogle_favorite(contract)}
                style={{
                  // TODO: can't set these on `RoundView`, but I'd be better to be able to
                  margin: 12,
                }}
              >
                <RoundView
                  size={45}
                  style={{
                    // TODO: DRY, and respect `private`
                    backgroundColor: backroundStyle,
                    alignSelf: "flex-end",
                  }}
                >
                  <IconsMap.Favorite2 color={colorStyle} />
                </RoundView>
              </TouchableOpacity>
            </ImageBackground>
          )}
          <View style={styleTaskDetailsContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CreatorImage creator={contract.creator} size={64} />
              <Text
                style={{
                  ...Fonts.bold_24,
                  fontWeight: "500",
                  lineHeight: 30,
                  marginLeft: 15,
                  color: color.allText,
                  flex: 1, // without this strings of a *medium* length can pass the screen borders
                }}
              >
                {limitString(contract.caption, captionLimit)}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                borderRadius: 24,
                marginTop: 25,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                {store.ui.mainTab === HeaderTabsEnum.TASKS ? (
                  <IconsMap.PeopleIcon />
                ) : (
                  <IconsMap.Accumulator color={acc_color} />
                )}
                <Text
                  style={{
                    ...Fonts.bold_18,
                    fontWeight: "700",
                    marginLeft: 8,
                    color: color.allText,
                  }}
                >
                  {itemsLeft}/{contract.totalAmount}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconsMap.Calendar />
                <Text
                  style={{
                    ...Fonts.bold_18,
                    fontWeight: "700",
                    marginLeft: 8,
                    color: color.allText,
                  }}
                >
                  ends {dayjs().to(contract.expireDate)}
                </Text>
              </View>
            </View>
          </View>
          {contract instanceof Perk && <ButtonBlock contract={contract} />}
          <Text style={styleTaskDescrHeader}>{lang.details}</Text>
          <Text style={styleTaskDescr}>{contract.description}</Text>
          {
            // TODO: this is ugly
            (contract instanceof TaskQuestions ||
              contract instanceof TaskAB ||
              contract instanceof TaskRate) && (
              <ButtonBlock contract={contract} />
            )
          }
        </View>
        <CreatorDescr creator={contract.creator} />
      </>
    );
  }
);

export const TaskDetailPan = observer(({ task }: { task: Task }) => {
  return <PanWrap renderContent={() => <ContractDescr2 contract={task} />} />;
});
