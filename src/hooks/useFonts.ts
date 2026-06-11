import {
  EBGaramond_400Regular,
  EBGaramond_400Regular_Italic,
  EBGaramond_500Medium,
  EBGaramond_500Medium_Italic,
  useFonts as useGaramondFonts,
} from '@expo-google-fonts/eb-garamond';
import {
  LibreFranklin_400Regular,
  LibreFranklin_500Medium,
  useFonts as useFranklinFonts,
} from '@expo-google-fonts/libre-franklin';
import { WorkSans_400Regular, WorkSans_500Medium, useFonts as useWorkFonts } from '@expo-google-fonts/work-sans';

export function useAppFonts() {
  const [garamondLoaded] = useGaramondFonts({
    EBGaramond_400Regular,
    EBGaramond_400Regular_Italic,
    EBGaramond_500Medium,
    EBGaramond_500Medium_Italic,
  });

  const [franklinLoaded] = useFranklinFonts({
    LibreFranklin_400Regular,
    LibreFranklin_500Medium,
  });

  const [workLoaded] = useWorkFonts({
    WorkSans_400Regular,
    WorkSans_500Medium,
  });

  return garamondLoaded && franklinLoaded && workLoaded;
}
