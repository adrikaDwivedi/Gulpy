import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Switch,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Svg, {
  Defs,
  ClipPath,
  Path,
  LinearGradient,
  Stop,
  Rect,
  Line,
} from "react-native-svg";

const ITEM_HEIGHT = 52;
const BW = 116;
const BH = 230;
const NECK_W = 46;
const BODY_W = 104;
const NECK_H = 42;
const BODY_H = BH - NECK_H - 8;
const CX = BW / 2;

const amounts = Array.from({ length: 71 }, (_, i) => 1000 + i * 100);

const PRESET_META = [
  { value: 1500, label: "4.0L", emoji: "💧", tag: "Minimum" },
  { value: 2000, label: "5.0L", emoji: "🌊", tag: "Recommended" },
  { value: 2500, label: "6.0L", emoji: "⚡", tag: "Active" },
  { value: 3000, label: "7.0L", emoji: "🏃", tag: "Athletic" },
];

const buildBottlePath = () => {
  const nW = NECK_W,
    bW = BODY_W,
    nH = NECK_H,
    bH = BODY_H;
  const cx = CX;
  const shoulderY = nH + 28;
  return (
    `M ${cx - nW / 2 + 7} 6 ` +
    `Q ${cx - nW / 2} 6 ${cx - nW / 2} 14 ` +
    `L ${cx - nW / 2} ${nH} ` +
    `Q ${cx - bW / 2} ${nH + 12} ${cx - bW / 2} ${shoulderY} ` +
    `L ${cx - bW / 2} ${nH + bH - 18} ` +
    `Q ${cx - bW / 2} ${nH + bH} ${cx - bW / 2 + 14} ${nH + bH} ` +
    `L ${cx + bW / 2 - 14} ${nH + bH} ` +
    `Q ${cx + bW / 2} ${nH + bH} ${cx + bW / 2} ${nH + bH - 18} ` +
    `L ${cx + bW / 2} ${shoulderY} ` +
    `Q ${cx + bW / 2} ${nH + 12} ${cx + nW / 2} ${nH} ` +
    `L ${cx + nW / 2} 14 ` +
    `Q ${cx + nW / 2} 6 ${cx + nW / 2 - 7} 6 ` +
    `Z`
  );
};
const BOTTLE_PATH = buildBottlePath();

const PresetCard = () => {
  const [goal, setGoal] = useState(2000);
  const scrollRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const scrollToValue = (value, animated = true) => {
    const index = amounts.indexOf(value);
    if (index !== -1 && scrollRef.current) {
      scrollRef.current.scrollTo({ y: index * ITEM_HEIGHT, animated });
    }
  };

  useEffect(() => {
    setTimeout(() => scrollToValue(goal, false), 120);
  }, []);

  const flash = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePreset = (value) => {
    flash();
    setGoal(value);
    scrollToValue(value);
  };

  const handleScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const snapped = amounts[Math.max(0, Math.min(index, amounts.length - 1))];
    if (snapped !== goal) {
      flash();
      setGoal(snapped);
    }
  };

  const activeMeta = PRESET_META.find((p) => p.value === goal);
  const fillPct = ((goal - 1000) / 7000) * 100;

  const waterFillRatio = Math.max(0, Math.min(1, (goal - 1000) / 7000));
  const maxWaterY = NECK_H + BODY_H;
  const minWaterY = NECK_H + 10;
  const waterTop = maxWaterY - (maxWaterY - minWaterY) * waterFillRatio;


  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerDot} />
          <Text style={styles.presetTitle}>Daily water goal</Text>
          {activeMeta && (
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{activeMeta.tag}</Text>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        {/* Body row */}
        <View style={styles.sections}>
          {/* LEFT: bottle */}
          <View style={styles.leftSection}>
            <View style={styles.cap} />

            <View style={{ width: BW, height: BH, position: "relative" }}>
              {/* Water fill */}
              <Svg
                width={BW}
                height={BH}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              >
                <Defs>
                  <ClipPath id="bottleClipFill">
                    <Path d={BOTTLE_PATH} />
                  </ClipPath>
                  <LinearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#21C8FF" stopOpacity="0.25" />
                    <Stop offset="1" stopColor="#21C8FF" stopOpacity="0.08" />
                  </LinearGradient>
                </Defs>
                <Rect
                  x={CX - BODY_W / 2}
                  y={waterTop}
                  width={BODY_W}
                  height={BH - waterTop}
                  fill="url(#waterGrad)"
                  clipPath="url(#bottleClipFill)"
                />
                <Rect
                  x={CX - BODY_W / 2}
                  y={waterTop}
                  width={BODY_W}
                  height={1.5}
                  fill="rgba(33,200,255,0.5)"
                  clipPath="url(#bottleClipFill)"
                />
              </Svg>

              {/* Scroll view inside bottle body */}
              <View
                style={{
                  position: "absolute",
                  top: NECK_H,
                  left: (BW - BODY_W) / 2,
                  width: BODY_W,
                  height: BODY_H,
                  overflow: "hidden",
                }}
              >
                <View style={styles.scrollFadeTop} pointerEvents="none" />
                <View style={styles.scrollFadeBottom} pointerEvents="none" />
                <View style={styles.selectionBand} pointerEvents="none" />

                <ScrollView
                  ref={scrollRef}
                  style={{ flex: 1 }}
                  contentContainerStyle={{
                    paddingVertical: (BODY_H - ITEM_HEIGHT) / 2,
                  }}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT}
                  decelerationRate="fast"
                  onMomentumScrollEnd={handleScroll}
                  onScrollEndDrag={handleScroll}
                  scrollEventThrottle={16}
                >
                  {amounts.map((val) => {
                    const isActive = val === goal;
                    return (
                      <View
                        key={val}
                        style={{
                          height: ITEM_HEIGHT,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: isActive ? 21 : 16,
                            fontWeight: isActive ? "800" : "500",
                            color: isActive
                              ? "#21C8FF"
                              : "rgba(33,200,255,0.2)",
                            letterSpacing: isActive ? -0.5 : 0,
                          }}
                        >
                          {(val / 1000).toFixed(1)}L
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Bottle outline */}
              <Svg
                width={BW}
                height={BH}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              >
                <Path
                  d={BOTTLE_PATH}
                  fill="none"
                  stroke="rgba(33,200,255,0.35)"
                  strokeWidth="1.5"
                />
                {[0.33, 0.66].map((f, i) => (
                  <Line
                    key={i}
                    x1={CX - BODY_W / 2 + 8}
                    y1={NECK_H + BODY_H * f}
                    x2={CX + BODY_W / 2 - 8}
                    y2={NECK_H + BODY_H * f}
                    stroke="rgba(33,200,255,0.1)"
                    strokeWidth="1"
                  />
                ))}
              </Svg>
            </View>
          </View>

          {/* RIGHT: readout */}
          <View style={styles.rightSection}>
            <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
              <Text style={styles.goalValue}>{(goal / 1000).toFixed(1)}</Text>
              <Text style={styles.goalUnit}>litres / day</Text>
            </Animated.View>

            <View style={styles.fillBarWrapper}>
              <View style={styles.fillBarLabel}>
                <Text style={styles.fillBarText}>Daily fill</Text>
                <Text style={styles.fillBarPct}>{Math.round(fillPct)}%</Text>
              </View>
              <View style={styles.fillBarTrack}>
                <View style={[styles.fillBarFill, { width: `${fillPct}%` }]} />
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statChip}>
                <Text style={styles.statNum}>{Math.round(goal / 250)}</Text>
                <Text style={styles.statLabel}>glasses</Text>
              </View>
              <View style={styles.statChip}>
                <Text style={styles.statNum}>{Math.round(goal / 500)}</Text>
                <Text style={styles.statLabel}>bottles</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Quick Presets — pill chips only */}
        {/* <Text style={styles.sectionLabel}>QUICK PRESETS</Text> */}
        {/* <View style={styles.chipRow}>
          {PRESET_META.map((item) => {
            const isActive = goal === item.value;
            return (
              <TouchableOpacity
                key={item.value}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => handlePreset(item.value)}
                activeOpacity={0.7}
              >
                <Text style={styles.chipEmoji}>{item.emoji}</Text>
                <Text
                  style={[
                    styles.chipAmount,
                    isActive && styles.chipAmountActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View> */}
      </View>
    </>
  );
};

export default PresetCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0D2245",
    borderRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginTop: 24,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  headerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#21C8FF",
  },
  presetTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
  },
  tagBadge: {
    backgroundColor: "rgba(33,200,255,0.12)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "rgba(33,200,255,0.25)",
  },
  tagText: {
    color: "#21C8FF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  sectionLabel: {
    color: "#4A7AB5",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
    marginBottom: 10,
    marginTop: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginVertical: 4,
  },
  sections: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 4,
  },
  leftSection: {
    width: BW + 4,
    alignItems: "center",
  },
  cap: {
    width: 38,
    height: 12,
    borderRadius: 5,
    backgroundColor: "#21C8FF",
    marginBottom: 2,
    opacity: 0.9,
  },
  rightSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingLeft: 4,
  },
  goalValue: {
    fontSize: 62,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -2,
    lineHeight: 66,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  goalUnit: {
    fontSize: 13,
    color: "#4A7AB5",
    fontWeight: "600",
    letterSpacing: 0.4,
    marginTop: 2,
    fontFamily: 'DMSans-Regular',
  },
  fillBarWrapper: { width: "100%", paddingHorizontal: 2 },
  fillBarLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  fillBarText: { color: "#4A7AB5", fontSize: 11, fontWeight: "600", fontFamily: 'DMSans-Regular'},
  fillBarPct: { color: "#21C8FF", fontSize: 11, fontWeight: "700" },
  fillBarTrack: {
    height: 4,
    backgroundColor: "#0A1C3A",
    borderRadius: 2,
    overflow: "hidden",
  },
  fillBarFill: { height: 4, backgroundColor: "#21C8FF", borderRadius: 2 },
  statsRow: { flexDirection: "row", gap: 8 },
  statChip: {
    backgroundColor: "#0A1C3A",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    minWidth: 54,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  statNum: {
    color: "#21C8FF",
    fontWeight: "800",
    fontSize: 17,
    lineHeight: 21,
  },
  statLabel: {
    color: "#4A7AB5",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.4,
    marginTop: 1,
    fontFamily: 'DMSans-Regular',
  },
  scrollFadeTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: (BODY_H - ITEM_HEIGHT) / 2,
    backgroundColor: "rgba(13,34,69,0.82)",
    zIndex: 2,
  },
  scrollFadeBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: (BODY_H - ITEM_HEIGHT) / 2,
    backgroundColor: "rgba(13,34,69,0.82)",
    zIndex: 2,
  },
  selectionBand: {
    position: "absolute",
    top: (BODY_H - ITEM_HEIGHT) / 2,
    left: 8,
    right: 8,
    height: ITEM_HEIGHT,
    backgroundColor: "rgba(33,200,255,0.09)",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(33,200,255,0.28)",
    borderRadius: 8,
    zIndex: 1,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#0A1C3A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  chipActive: {
    backgroundColor: "rgba(33,200,255,0.12)",
    borderColor: "#21C8FF",
  },
  chipEmoji: { fontSize: 14 },
  chipAmount: { color: "#4A7AB5", fontWeight: "700", fontSize: 13 },
  chipAmountActive: { color: "#21C8FF" },

  // reminderSection:{
  //   marginTop:20,
  // },
  
});
