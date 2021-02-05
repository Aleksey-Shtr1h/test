import React from 'react'
import { View, StyleSheet, ViewStyle, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { Fonts } from 'src/theme/typography'
import { color } from 'src/theme/color'
import { observer } from 'mobx-react'
import { useStore } from 'src/hooks/use-store'
import { Perk, perkCategories } from 'src/stores/task-store'
import { PerkInfo } from './components/good-info'
import { PerkDetails } from './components/good-details'
import { PanWrap } from '../pan-wrap'
import { Icon } from 'react-native-elements'
import { IconsMap } from 'src/components/point-icon/icons'
import { ContractDescr } from '../task-detail-pan'
//*
const ContractDescr2 = observer(({ perk }: { perk: Perk }) => {
	const store = useStore()
	const insufficient = (store.auth.balance || 0) <= perk.value

	return (
		<>
		<ImageBackground
			source={perk.image}
			style={{
				width: '100%',
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
			<View style={{
				paddingHorizontal: 20,
				paddingBottom: 24,
				height: '100%',
				justifyContent: 'space-between',
			}}>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
					<View style={{
						backgroundColor: color.secondaryDarkGray,
						borderRadius: 20,
						height: 26,
						width: 110,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
						<Text
							style={{
								...Fonts.reg_12,
								fontWeight: '600',
								color: color.secondaryDarkBlue,
							}}
						>
							{perkCategories.get(perk.category).caption}
						</Text>
					</View>
					<IconsMap.ShareIcon color={color.secondaryBlue}/>
				</View>
			</View>
		</ImageBackground>
		<View style={{ backgroundColor: color.secondaryDarkGray }}>
			<PerkInfo perk={perk} />
			<View style={{
				marginTop: -15,
				marginBottom: 15,
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1,
			}}>
				<TouchableOpacity
					onPress={() => insufficient === false && perk.buy()}
					style={{
						backgroundColor: insufficient ? 'transparent' : color.perksPrimary,
						borderRadius: 40,
						paddingLeft: 24,
						paddingRight: 10,
						height: 56,
						maxWidth: 258,
						// width: '100%',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<View style={styleLabelContainer}>
						<Text style={Fonts.bold_18}>{perk.value} Px (€)</Text>
					</View>
					{!insufficient && (
						<Icon name={'payment'} size={19} color={color.white} containerStyle={ICON_CNTR} />
					)}
					<Text
						style={{
							fontFamily: 'Helvetica',
							fontSize: 18,
							lineHeight: 22,
							fontWeight: 'bold',
							fontStyle: 'normal',
							marginLeft: 19,
							color: insufficient ? color.secondaryDarkBlue : color.white,
						}}
					>
						{insufficient ? 'Not enough Px' : 'Buy this item'}
					</Text>
					{insufficient && <Icon name={'info'} color={color.secondaryDarkBlue} size={19} containerStyle={ICON_CNTR} />}
				</TouchableOpacity>
			</View>
			<PerkDetails perk={perk} />
		</View>
		</>
	)
})
//*/
export const PerkDetailPan = observer(({ perk }: { perk: Perk }) => {
	return <PanWrap renderContent={() => <ContractDescr contract={perk} />} />
})

const styleLabelContainer: ViewStyle = {
	width: 85,
	height: 34,
	backgroundColor: '#FF8F2A',
	borderRadius: 24,

	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'row',

	paddingHorizontal: 12,
}

const ICON_CNTR: ViewStyle = {
	marginLeft: 19,
}
