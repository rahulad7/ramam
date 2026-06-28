import { useEffect, useState } from 'react';
import { Modal, Pressable, TextInput, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { ThemedView } from '@/components/ui/ThemedView';
import { Typography } from '@/components/ui/Typography';
import { THEME_COLORS } from '@/constants/theme';

type NotePromptModalProps = {
  visible: boolean;
  title: string;
  initialValue?: string;
  onSave: (note: string) => void | Promise<void>;
  onClose: () => void;
};

export function NotePromptModal({
  visible,
  title,
  initialValue = '',
  onSave,
  onClose,
}: NotePromptModalProps) {
  const [value, setValue] = useState(initialValue);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible) {
      setValue(initialValue);
    }
  }, [visible, initialValue]);

  async function handleSave() {
    if (saving) return;

    setSaving(true);
    try {
      await onSave(value.trim());
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-end">
        <Pressable className="absolute inset-0 bg-black/40" onPress={onClose} accessibilityLabel="Close" />
        <ThemedView className="border-t border-outline-variant bg-background px-5 pb-8 pt-5">
          <Typography variant="label-sm">{title}</Typography>
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder="Optional note..."
            placeholderTextColor={THEME_COLORS.iconMuted}
            multiline
            className="mt-3 min-h-[96px] border border-outline-variant px-3 py-3 font-franklin text-base text-on-surface"
            textAlignVertical="top"
            autoFocus
          />
          <View className="mt-4 flex-row gap-3">
            <View className="flex-1">
              <Button label="Cancel" variant="secondary" onPress={onClose} />
            </View>
            <View className="flex-1">
              <Button label="Save" onPress={handleSave} disabled={saving} />
            </View>
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
}
