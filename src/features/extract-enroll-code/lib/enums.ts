export const MajorMap = {
  tif: 'Teknik Informatika',
  si: 'Sistem Informasi',
  tekkom: 'Teknik Komputer',
  ti: 'Teknologi Informasi',
  pti: 'Pendidikan Teknologi Informasi',
  msi: 'Magister Sistem Informasi',
  mcs: 'Magister Ilmu Komputer',
  dcs: 'Doktor Ilmu Komputer',
} as const;

export type MajorMapKey = keyof typeof MajorMap;
export type MajorMapValue = (typeof MajorMap)[MajorMapKey];

export const MajorArray: { key: MajorMapKey; value: MajorMapValue }[] =
  Object.entries(MajorMap).map(([key, value]) => ({
    key: key as MajorMapKey,
    value,
  }));

export const getMajorMapKey = (
  major: MajorMapValue
): MajorMapKey | undefined => {
  const entry = Object.entries(MajorMap).find(([_, value]) => value === major);
  return entry ? (entry[0] as MajorMapKey) : undefined;
};
