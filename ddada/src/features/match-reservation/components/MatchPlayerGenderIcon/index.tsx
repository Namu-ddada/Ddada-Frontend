import FEMALE_COLOR_ICON from '@/static/imgs/match-reservation/match-reservation-female-color-icon.svg'
import FEMALE_NOCOLOR_ICON from '@/static/imgs/match-reservation/match-reservation-female-nocolor-icon.svg'
import MALE_COLOR_ICON from '@/static/imgs/match-reservation/match-reservation-male-color-icon.svg'
import MALE_NOCOLOR_ICON from '@/static/imgs/match-reservation/match-reservation-male-nocolor-icon.svg'

interface MatchPlayerGenderIconProps {
  matchType: string
  playersGender: string[]
}
export default function MatchPlayerGenderIcon({
  matchType,
  playersGender,
}: MatchPlayerGenderIconProps) {
  return (
    <div className="flex">
      {/* 1번째 팀원 */}
      {matchType === 'MALE_DOUBLE' && playersGender[0] === 'MALE' && (
        <div>
          <MALE_COLOR_ICON />
        </div>
      )}
      {matchType === 'MALE_DOUBLE' && playersGender[0] === 'notReserved' && (
        <div>
          <MALE_NOCOLOR_ICON />
        </div>
      )}
      {matchType === 'MIXED_DOUBLE' && playersGender[0] === 'MALE' && (
        <div>
          <MALE_COLOR_ICON />
        </div>
      )}
      {matchType === 'MIXED_DOUBLE' && playersGender[0] === 'notReserved' && (
        <div>
          <MALE_NOCOLOR_ICON />
        </div>
      )}
      {matchType === 'FEMALE_DOUBLE' && playersGender[0] === 'FEMALE' && (
        <div>
          <FEMALE_COLOR_ICON />
        </div>
      )}

      {matchType === 'FEMALE_DOUBLE' && playersGender[0] === 'notReserved' && (
        <div>
          <FEMALE_NOCOLOR_ICON />
        </div>
      )}
      {/* 2번째 팀원 */}
      {matchType === 'MIXED_DOUBLE' && playersGender[1] === 'FEMALE' && (
        <div>
          <FEMALE_COLOR_ICON />
        </div>
      )}
      {matchType === 'MIXED_DOUBLE' && playersGender[1] === 'notReserved' && (
        <div>
          <FEMALE_NOCOLOR_ICON />
        </div>
      )}

      {matchType === 'MALE_DOUBLE' && playersGender[1] === 'MALE' && (
        <div>
          <MALE_COLOR_ICON />
        </div>
      )}
      {matchType === 'MALE_DOUBLE' && playersGender[1] === 'notReserved' && (
        <div>
          <MALE_NOCOLOR_ICON />
        </div>
      )}

      {matchType === 'FEMALE_DOUBLE' && playersGender[1] === 'FEMALE' && (
        <div>
          <FEMALE_COLOR_ICON />
        </div>
      )}
      {matchType === 'FEMALE_DOUBLE' && playersGender[1] === 'notReserved' && (
        <div>
          <FEMALE_NOCOLOR_ICON />
        </div>
      )}
    </div>
  )
}
