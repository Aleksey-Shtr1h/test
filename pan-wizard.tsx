import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from 'src/hooks/use-store'
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
} from 'src/stores/ui-store'
import { SettingsPan } from 'src/pans/settings-pan'
import { TaskDetailPan } from 'src/pans/task-detail-pan'
import { PerkDetailPan } from 'src/pans/good-detail-pan/good-detail-pan'
import { PurchasePan } from 'src/pans/purchase-pan'
import { TaskProgressPan } from 'src/pans/task-progress-pan/task-progress-pan'
import { CompletePan } from 'src/pans/complete-pan'
import { CreatorPan } from 'src/pans/creator-pan'
import { MnemonicsPan } from 'src/pans/mnemonics-pan'
import { PreferencesPan } from 'src/pans/preferences-pan'
import { DocPan } from 'src/pans/doc-pan'

export const PanWizard = observer(() => {
	const store = useStore()

	const activePan = store.ui.activePan

	if (activePan instanceof PerkPanArgs) return <PerkDetailPan perk={activePan.perk}/>
	if (activePan instanceof PerkResultPanArgs) return <PurchasePan perkResult={activePan.perkResult}/>
	if (activePan instanceof TaskPanArgs) return <TaskDetailPan task={activePan.task}/>
	if (activePan instanceof TaskProgressPanArgs) return <TaskProgressPan task={activePan.task}/>
	if (activePan instanceof CreatorPanArgs) return <CreatorPan creator={activePan.creator}/>
	if (activePan instanceof CompletePanArgs) return <CompletePan taskResult={activePan.taskResult}/>
	if (activePan instanceof SettingsPanArgs) return <SettingsPan />
	if (activePan instanceof MnemonicsPanArgs) return <MnemonicsPan />
	if (activePan instanceof PreferencesPanArgs) return <PreferencesPan />
	if (activePan instanceof DocPanArgs) return <DocPan text={activePan.text}/>
	// if( activePan === null ) - none of the pans are open
	return null
})
