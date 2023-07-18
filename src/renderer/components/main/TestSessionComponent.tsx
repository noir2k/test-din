import { useEffect, useState, useRef } from 'react';
import { useAppSelector } from '@hook/index';

import type { RootState } from '@store/index';

import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from 'react-csv';
import Html2Pdf from 'js-html2pdf';
import hash from 'object-hash';

import { TestForm } from '@interfaces';
import { ColumnNameHeader, FixedTypeOptions, findMargin } from '@lib/common';

const TestSessionHeader = () => {
  return (
    <div className="session-header bg-slate-100">
      <div className="col-span-2 border-1 border-black font-bold text-lg w-20">
        Receiver
      </div>
      <div className="col-span-2 border-1 border-black font-bold text-lg w-20">
        Mode
      </div>
      <div className="row-span-2 font-bold w-36">
        <div className="font-bold text-lg">
          DIN SRT
          <br />
          (dB SNR)
        </div>
      </div>
      <div className="col-span-5 font-bold text-lg">
        Estimated Hearing Level
      </div>
      <div>Signal</div>
      <div>Noise</div>
      <div>List</div>
      <div>Score</div>
      <div className="text-vertical-th">
        <span>Normal</span>
      </div>
      <div className="text-vertical-th">
        <span>Mild</span>
      </div>
      <div className="text-vertical-th">
        <span>Moderate</span>
      </div>
      <div className="text-vertical-th">
        <span>
          Moderate to
          <br className="h-0" />
          Severe
        </span>
      </div>
      <div className="text-vertical-th">
        <span>Severe 이상</span>
      </div>
    </div>
  );
};

interface PropsType {
  item: TestForm;
  index: number;
  maxCount: number;
}

const PAGE_BREAK = 6;

const TestSessionItem = ({ item, index, maxCount }: PropsType) => {
  const {
    receiver,
    fixed_type,
    direction,
    sound_set,
    scoring,
    test_result,
    test_estimate,
    memo,
    test_datetime,
  } = item;

  const [margin, setMargin] = useState({});
  const [barColor, setBarColor] = useState('');
  const [fontColor, setFontColor] = useState('');
  const [dirStr, setDirStr] = useState(['B', 'B']);

  const isPageBreak = (index + 1) % PAGE_BREAK === 0;
  const isLastPage = index === maxCount - 1;
  const isNextFirstPage = (index + 1) % PAGE_BREAK === 1;

  let sessionItemClass = 'session-item-grid';
  if (isLastPage) {
    sessionItemClass += ' session-item-bd-btm';
  }

  if (isNextFirstPage && index !== 0) {
    sessionItemClass += ' firstItem';
  }

  if (isPageBreak) {
    sessionItemClass += ' lastItem';
  }

  useEffect(() => {
    const mar = findMargin(test_estimate, test_result);

    setMargin(mar);

    if (direction === 'L' || direction === 'LSRN') {
      setBarColor('bg-blue-500');
      setFontColor('font-bold text-blue-500');
      if (direction === 'L') {
        setDirStr(['L', 'L']);
      } else if (direction === 'LSRN') {
        setDirStr(['L', 'R']);
      }
    } else if (direction === 'R' || direction === 'LNRS') {
      setBarColor('bg-red-500');
      setFontColor('font-bold text-red-500');
      if (direction === 'R') {
        setDirStr(['R', 'R']);
      } else if (direction === 'LNRS') {
        setDirStr(['R', 'L']);
      }
    } else if (direction === 'LR') {
      setBarColor('bg-green-500');
      setFontColor('font-bold text-green-500');
      setDirStr(['B', 'B']);
    }
  }, []);

  return (
    <div className="session-item">
      <div className={sessionItemClass}>
        <div className="col-span-2">{receiver}</div>
        <div className="col-span-2">{FixedTypeOptions[fixed_type]}</div>
        <div className="row-span-2">
          <span className="text-2xl float-none">{test_result.toFixed(2)}</span>
        </div>
        <div className="row-span-2">
          {test_estimate === 'Normal' && (
            <div style={margin} className={`${barColor} bar-div`} />
          )}
        </div>
        <div className="row-span-2">
          {test_estimate === 'Mild' && (
            <div style={margin} className={`${barColor} bar-div`} />
          )}
        </div>
        <div className="row-span-2">
          {test_estimate === 'Moderate' && (
            <div style={margin} className={`${barColor} bar-div`} />
          )}
        </div>
        <div className="row-span-2">
          {test_estimate === 'Moderate to Severe' && (
            <div style={margin} className={`${barColor} bar-div`} />
          )}
        </div>
        <div className="row-span-2">
          {test_estimate === 'Severe 이상' && (
            <div style={margin} className={`${barColor} bar-div`} />
          )}
        </div>
        <div className={fontColor}>{dirStr[0]}</div>
        <div>{dirStr[1]}</div>
        <div>{sound_set}</div>
        <div>{scoring[0].toUpperCase()}</div>

        {memo && memo.length > 0 && (
          <div className="col-span-10 note-td">
            <span>NOTE: {memo}</span>
          </div>
        )}
        <div className="col-span-10 time-td">
          <span>{test_datetime}</span>
        </div>
      </div>
      {isPageBreak && <div className="html2pdf__page-break" />}
    </div>
  );
};

const TestSession = () => {
  const componentRef = useRef(null);

  const userData = useAppSelector((state: RootState) => state.userData);
  const testResult = useAppSelector((state: RootState) => state.testResult);
  const { data } = testResult;
  const datetime = dayjs(data[0].test_datetime).format('YYYYMMDD_HHmmss');
  const fileName = `${datetime}_${userData.user_name}(${userData.patient_no})`;

  const handlePrintPDF = useReactToPrint({
    content: () => componentRef.current,
    print: async (printIframe: HTMLIFrameElement) => {
      const document = printIframe.contentDocument;

      if (document) {
        document.body.style.backgroundImage = 'none';
        if (document.getElementsByClassName('firstItem')[0]) {
          document
            .getElementsByClassName('firstItem')[0]
            .classList.add('session-item-bd-top');
        }
        if (document.getElementsByClassName('lastItem')[0]) {
          document
            .getElementsByClassName('lastItem')[0]
            .classList.add('session-item-bd-btm');
        }
        const options = {
          margin: [10, 10, 20, 10],
          pagebreak: {
            mode: ['avoid-all', 'css', 'legacy'],
          },
          filename: `${fileName}.pdf`,
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: {
            scale: 4, // for PDF resolution
            useCORS: true,
            dpi: 300,
            letterRendering: true,
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
          },
          source: document.documentElement.outerHTML,
          download: true,
        };

        await Html2Pdf.getPdf(options);
      }
    },
    removeAfterPrint: true,
  });

  return (
    <div className="test-session-wrapper">
      <div id="print_pdf" className="inner" ref={componentRef}>
        <div className="flex-col leading-12 mb-3">
          <div className="text-center text-2xl font-bold leading-10">
            아이해브 청력테스트 Pro
          </div>
          <div className="text-center text-lg font-bold mb-8">
            [Korean Digit-In-Noise test]
          </div>
          <div className="grid grid-cols-3 test-session-pi">
            <div className="col-span-3">Patient identification</div>
            <div>
              ID : &nbsp;<b>{userData.patient_no}</b>
            </div>
            <div>
              Name : &nbsp;<b>{userData.user_name}</b>
            </div>
            <div>
              Sex/Birth : &nbsp;<b>{userData.gender}</b>&nbsp;/&nbsp;
              <b>{userData.birthday}</b>
            </div>
            <div className="col-span-2">
              Tested By : &nbsp;<b>{userData.tester_name}</b>
            </div>
            <div>
              Session ID : &nbsp;<b>{userData.sessionId}</b>
            </div>
          </div>
          <TestSessionHeader />
          {data &&
            data.map((item: TestForm, index: number) => (
              <TestSessionItem
                key={hash(item)}
                item={item}
                index={index}
                maxCount={data.length}
              />
            ))}
        </div>
      </div>
      <div className="print-button-wrapper">
        <button type="button" className="csv-print-btn">
          <CSVLink
            data={testResult.data}
            headers={ColumnNameHeader}
            filename={`${fileName}.csv`}
          >
            CSV 저장
          </CSVLink>
        </button>
        <button
          type="button"
          className="pdf-print-btn"
          onClick={handlePrintPDF}
        >
          PDF 저장
        </button>
      </div>
    </div>
  );
};

export default TestSession;
