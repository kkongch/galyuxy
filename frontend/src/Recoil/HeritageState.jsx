import { atom } from 'recoil';

export const heritageState = atom({
  key: 'heritage',
  default: {
    heritageId: 1,
    heritageName: '정림사지 5층 석탑',
    heritageContent:
      '충청남도 부여군 부여읍 부여 정림사지에 있는 후기 사비 백제의 석탑(石塔)으로, 익산 미륵사지 석탑과 함께 현전하는 유이(唯二)한 백제시대의 석탑이다. 부여 정림사지 오층석탑의 설립 배경에 대한 기록이 남아 있지 않아 언제 석탑이 세워졌는지 알 수 없지만, 백제가 사비로 천도한 시기인 6세기 중엽에 석탑이 설립된 것으로 추정된다.',
    heritageImageUrl: 'url',
    heritage3dImageUrl: 'url',
    era: {
      eraId: 1,
      eraName: '삼국시대',
      eraCountry: '백제',
    },
  },
});
