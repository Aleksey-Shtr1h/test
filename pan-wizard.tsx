import React from "react";
import { observer } from "mobx-react";
import { useStore } from "src/hooks/use-store";
import {
  CompletePanArgs,
  CreatorPanArgs,
  PerkPanArgs,
  PerkResultPanArgs,
  MnemonicsPanArgs,
  SettingsPanArgs,
  TaskPanArgs,
  TaskProgressPanArgs,
  PreferencesPanArgs,
  DocPanArgs,
} from "src/stores/ui-store";
import { SettingsPan } from "src/pans/settings-pan";
import { TaskDetailPan } from "src/pans/task-detail-pan";
import { PerkDetailPan } from "src/pans/good-detail-pan/good-detail-pan";
import { PurchasePan } from "src/pans/purchase-pan";
import { TaskProgressPan } from "src/pans/task-progress-pan/task-progress-pan";
import { CompletePan } from "src/pans/complete-pan";
import { CreatorPan } from "src/pans/creator-pan";
import { MnemonicsPan } from "src/pans/mnemonics-pan";
import { PreferencesPan } from "src/pans/preferences-pan";
import { DocPan } from "src/pans/doc-pan";

const askInstanceofClass = (arrClass, activePan) => {
  return arrClass.find((elem) => activePan instanceof elem);
};

export const PanWizard = observer(() => {
  const store = useStore();

  const activePan = store.ui.activePan;

  const objClassFun = {
    PerkPanArgs: <PerkDetailPan perk={activePan.perk} />,
    PerkResultPanArgs: <PurchasePan perkResult={activePan.perkResult} />,
    TaskPanArgs: <TaskDetailPan task={activePan.task} />,
    TaskProgressPanArgs: <TaskProgressPan task={activePan.task} />,
    CreatorPanArgs: <CreatorPan creator={activePan.creator} />,
    CompletePanArgs: <CompletePan taskResult={activePan.taskResult} />,
    SettingsPanArgs: <SettingsPan />,
    MnemonicsPanArgs: <MnemonicsPan />,
    PreferencesPanArgs: <PreferencesPan />,
    DocPanArgs: <DocPan text={activePan.text} />,
  };

  const arrClass = Object.keys(objClassFun);

  const elemClass = askInstanceofClass(arrClass, activePan);

  if (elemClass) {
    return objClassFun[elemClass];
  }

  // if( activePan === null ) - none of the pans are open
  return null;
});
