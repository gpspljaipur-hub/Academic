import { Text, View, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from './Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import MarginHW from '../../../comman/Sizes/MarginHW';
import Colors from '../../../comman/Colors';
import FontsSize from '../../../comman/Sizes/FontsSize';
import fonts from '../../../comman/fonts';
import { APP_TEXT } from '../../../comman/String';
import Images from '../../../comman/Images';
import Button from '../../../components/Button';

const Premium = ({ navigation }: any) => {
    const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack()}>
                    <Text style={styles.headerIcon}>✕</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{APP_TEXT.premiumHeaderTitle}</Text>
                <TouchableOpacity>
                    <View style={styles.helpContainer}>
                        <Text style={styles.helpText}>?</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Banner */}
                <View style={styles.bannerContainer}>
                    <View style={styles.bannerPattern1} />
                    <View style={styles.bannerPattern2} />
                    
                    <View style={styles.upgradePill}>
                        <Text style={styles.upgradePillText}>{APP_TEXT.premiumUpgradePill}</Text>
                    </View>
                    <Text style={styles.bannerTitle}>{APP_TEXT.premiumBannerTitle}</Text>
                    <Text style={styles.bannerDesc}>
                        {APP_TEXT.premiumBannerDesc}
                    </Text>
                </View>

                {/* Advantages */}
                <Text style={styles.sectionTitle}>{APP_TEXT.premiumAdvantageTitle}</Text>
                
                <View style={styles.advantageCard}>
                    <View style={styles.advIconContainer}>
                        <Image source={Images.rocket} style={styles.advIcon} />
                        {/* <Text style={styles.advIconText}>🚀</Text> */}
                    </View>
                    <View style={styles.advTextContainer}>
                        <Text style={styles.advTitle}>{APP_TEXT.premiumAdv1Title}</Text>
                        <Text style={styles.advDesc}>{APP_TEXT.premiumAdv1Desc}</Text>
                    </View>
                </View>

                <View style={styles.advantageCard}>
                    <View style={styles.advIconContainer}>
                        <Image source={Images.aiIntelligence} style={styles.advIcon} />
                        {/* <Text style={styles.advIconText}>🧠</Text> */}
                    </View>
                    <View style={styles.advTextContainer}>
                        <Text style={styles.advTitle}>{APP_TEXT.premiumAdv2Title}</Text>
                        <Text style={styles.advDesc}>{APP_TEXT.premiumAdv2Desc}</Text>
                    </View>
                </View>

                <View style={styles.advantageCard}>
                    <View style={styles.advIconContainer}>
                        <Image source={Images.eye} style={styles.advIcon} />
                        {/* <Text style={styles.advIconText}>👁️</Text> */}
                    </View>
                    <View style={styles.advTextContainer}>
                        <Text style={styles.advTitle}>{APP_TEXT.premiumAdv3Title}</Text>
                        <Text style={styles.advDesc}>{APP_TEXT.premiumAdv3Desc}</Text>
                    </View>
                </View>

                {/* Choose Path */}
                <Text style={styles.sectionTitle}>{APP_TEXT.premiumChoosePathTitle}</Text>

                <TouchableOpacity 
                    style={[styles.planCard, selectedPlan === 'monthly' && styles.planCardActive]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedPlan('monthly')}
                >
                    <View style={[styles.radioOuter, selectedPlan === 'monthly' && styles.radioOuterActive]}>
                        {selectedPlan === 'monthly' && <View style={styles.radioInner} />}
                    </View>
                    <View style={styles.planTextContainer}>
                        <Text style={styles.planTitle}>{APP_TEXT.premiumMonthlyTitle}</Text>
                        <Text style={styles.planDesc}>{APP_TEXT.premiumMonthlyDesc}</Text>
                    </View>
                    <View style={styles.planPriceContainer}>
                        <Text style={styles.planPrice}>{APP_TEXT.premiumMonthlyPrice}<Text style={styles.planPeriod}>{APP_TEXT.premiumMonthlyPeriod}</Text></Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.planCard, selectedPlan === 'yearly' && styles.planCardActive, { marginTop: MarginHW.MarginH10 }]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedPlan('yearly')}
                >
                    <View style={styles.bestValueTag}>
                        <Text style={styles.bestValueText}>{APP_TEXT.premiumBestValue}</Text>
                    </View>
                    <View style={[styles.radioOuter, selectedPlan === 'yearly' && styles.radioOuterActive]}>
                        {selectedPlan === 'yearly' && <View style={styles.radioInner} />}
                    </View>
                    <View style={styles.planTextContainer}>
                        <Text style={styles.planTitle}>{APP_TEXT.premiumYearlyTitle}</Text>
                        <Text style={styles.planDesc}>{APP_TEXT.premiumYearlyDesc}</Text>
                    </View>
                    <View style={styles.planPriceContainer}>
                        <Text style={styles.planPrice}>{APP_TEXT.premiumYearlyPrice}<Text style={styles.planPeriod}>{APP_TEXT.premiumYearlyPeriod}</Text></Text>
                        <Text style={styles.originalPrice}>{APP_TEXT.premiumOriginalPrice}</Text>
                    </View>
                </TouchableOpacity>

                {/* Testimonial */}
                <ImageBackground 
                    source={{uri: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}} 
                    style={styles.testimonialContainer}
                    imageStyle={{ opacity: 0.4 }}
                >
                    <View style={styles.testimonialOverlay} />
                    <Text style={styles.testimonialText}>
                        {APP_TEXT.premiumTestimonialText}
                    </Text>
                    <Text style={styles.testimonialAuthor}>{APP_TEXT.premiumTestimonialAuthor}</Text>
                </ImageBackground>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Button label={APP_TEXT.premiumUpgradeButton} onPress={() => {}}  />
            
                <Text style={styles.secureText}>{APP_TEXT.premiumSecureText}</Text>
            </View>
        </SafeAreaView>
    )
}

export default Premium
