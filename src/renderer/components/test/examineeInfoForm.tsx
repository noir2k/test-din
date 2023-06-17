import ico_refresh from '@assets/images/icons/icon_refresh_white.png';
import ico_check from '@assets/images/icons/icon_check_white.png';
import ico_speaker from '@assets/images/icons/icon_speaker.png';

export default function ExamineeInfoForm() {
  return (
    <>
      <div className="info-form-title">
        <img src={ico_speaker} alt="speaker icon" />
        <p>피검사자 기본 정보를 입력해 주세요.</p>
      </div>

      <div className="info-input-wrapper">
        <ul className="info-input-inner">
          <li className="info-input-item">
            <p className="info-input-item-order-number">01</p>
            <p className="info-input-item-subject">이름</p>
            <input
              type="text"
              name="username"
              id="username"
              className="info-input-item-input"
            />
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">02</p>
            <p className="info-input-item-subject">성별</p>
            <input
              type="text"
              name="sex"
              id="sex"
              className="info-input-item-input"
            />
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">03</p>
            <p className="info-input-item-subject">생년월일</p>
            <input
              type="text"
              name="birthDate"
              id="birthDate"
              className="info-input-item-input"
            />
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">04</p>
            <p className="info-input-item-subject">피검사자번호</p>
            <input
              type="text"
              name="examineeId"
              id="examineeId"
              className="info-input-item-input"
            />
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">05</p>
            <label
              htmlFor="direction-select"
              className="info-input-item-subject"
            >
              제시방향
            </label>
            <select id="direction-select" className="info-input-item-input">
              <option value="좌">좌</option>
              <option value="우">우</option>
              <option value="양방향">양방향</option>
              <option value="좌 노이즈 우 스피치">좌 노이즈 우 스피치</option>
              <option value="우 노이즈 좌 스피치">우 노이즈 좌 스피치</option>
            </select>
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">06</p>
            <label htmlFor="start-level" className="info-input-item-subject">
              시작레벨
            </label>
            <select id="start-level" className="info-input-item-input">
              <option value="-6">-6</option>
              <option value="-5">-5</option>
              <option value="-4">-4</option>
              <option value="-3">-3</option>
              <option value="-2">-2</option>
              <option value="-1">-1</option>
              <option value="0">0</option>
              <option value="+1">+1</option>
              <option value="+2">+2</option>
              <option value="+3">+3</option>
              <option value="+4">+4</option>
              <option value="+5">+5</option>
              <option value="+6">+6</option>
              <option value="+7">+7</option>
              <option value="+8">+8</option>
              <option value="+9">+9</option>
              <option value="+10">+10</option>
            </select>
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">07</p>
            <label htmlFor="scoring-method" className="info-input-item-subject">
              채점방식
            </label>
            <select id="scoring-method" className="info-input-item-input">
              <option value="Digit Scoring">Digit Scoring</option>
              <option value="Tripet Scoring">Tripet Scoring</option>
            </select>
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">08</p>
            <label htmlFor="sound-set" className="info-input-item-subject">
              사운드세트
            </label>
            <select id="sound-set" className="info-input-item-input">
              <option value="List 1">List 1</option>
              <option value="List 2">List 2</option>
              <option value="List 3">List 3</option>
              <option value="List 4">List 4</option>
              <option value="List 5">List 5</option>
              <option value="List 6">List 6</option>
            </select>
          </li>
        </ul>
      </div>

      <div className="info-memo-wraper">
        <input
          type="text"
          className="info-memo-input"
          placeholder="참고사항을 입력해주세요."
        />
      </div>

      <div className="info-btn-wrapper">
        <button className="info-btn" type="reset">
          <img src={ico_refresh} alt="ico_refresh" />
        </button>
        <button className="info-btn" type="button">
          <img src={ico_check} alt="ico_check" />
        </button>
      </div>
    </>
  );
}
