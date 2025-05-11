import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Land_Form/Basic details" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="Land_Form/lnd_own" options={{ headerShown: false }} />
      <Stack.Screen name="Land_Form/land_develop_act" options={{ headerShown: false }} />
      <Stack.Screen name="Land_Form/bank_details" options={{ headerShown: false }} />
      <Stack.Screen name="Land_Form/preview" options={{ headerShown: false }} />
      <Stack.Screen name="pond_form/lnd_own" options={{ headerShown: false }} />
      <Stack.Screen name="pond_form/design_of_farm_pond" options={{ headerShown: false }} />
      <Stack.Screen name="pond_form/bank_details" options={{ headerShown: false }} />
      <Stack.Screen name="pond_form/preview" options={{ headerShown: false }} />
      <Stack.Screen name="pond_form/Basic details" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="plantation_form/lnd_own" options={{ headerShown: false }} />
      <Stack.Screen name="plantation_form/proposed_work_by_farmer" options={{ headerShown: false }} />
      <Stack.Screen name="plantation_form/bank_details" options={{ headerShown: false }} />
      <Stack.Screen name="plantation_form/preview" options={{ headerShown: false }} />
      <Stack.Screen name="plantation_form/Basic details" options={{ headerShown: false }} />
      <Stack.Screen name="pre/filter_section_approved" options={{ headerShown: false }} />
      <Stack.Screen name="pre/filter_section_pending" options={{ headerShown: false }} />
      <Stack.Screen name="pre/filter_section_rejected" options={{ headerShown: false }} />
      <Stack.Screen name="pre/filter_section_total" options={{ headerShown: false }} />
      <Stack.Screen name="post/filter_section_approved" options={{ headerShown: false }} />
      <Stack.Screen name="post/filter_section_pending" options={{ headerShown: false }} />
      <Stack.Screen name="post/filter_section_rejected" options={{ headerShown: false }} />
      <Stack.Screen name="post/filter_section_total" options={{ headerShown: false }} />
      <Stack.Screen name="draft_page" options={{ headerShown: false }} />
      <Stack.Screen name="post_fund_land" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard_verifier" options={{ headerShown: false }} />
      <Stack.Screen name="verifier/land" options={{ headerShown: false }} />
      <Stack.Screen name="verifier/pond" options={{ headerShown: false }} />
      <Stack.Screen name="verifier/filter/filter_section_approved" options={{ headerShown: false }} />
      <Stack.Screen name="verifier/filter/filter_section_remarks" options={{ headerShown: false }} />
      <Stack.Screen name="verifier/filter/filter_section_pending" options={{ headerShown: false }} />
      <Stack.Screen name="verifier/filter/filter_section_total" options={{ headerShown: false }} />
      <Stack.Screen name="post_fund_pond" options={{ headerShown: false }} />
      <Stack.Screen name="post_fund_horti" options={{ headerShown: false }} />
      <Stack.Screen name="profile_verifier" options={{ headerShown: false }} />
      <Stack.Screen name="verifier/horti" options={{ headerShown: false }} />
    </Stack>
  );
}
