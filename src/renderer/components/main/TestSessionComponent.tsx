/* eslint-disable react/require-default-props */
import { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import { useReactToPrint } from 'react-to-print';

import Html2Pdf from 'js-html2pdf';

import { setReplaceResult } from '@store/slices/testResultProvider';

import { setDimPopup } from '@store/slices/navigateProvicer';

import { XMarkIcon } from '@heroicons/react/24/outline';

import isEmpty from 'lodash.isempty';

import { TestForm } from '@interfaces';
import { ColumnName, DataRange } from '@lib/common';

const TestSession = () => {
  const componentRef = useRef(null);
  const testResult = useAppSelector((state: RootState) => state.testResult);

  const documentTitle = 'Test Result';

  const handlePrintPDF = useReactToPrint({
    content: () => componentRef.current,
		print: async (printIframe: HTMLIFrameElement) => {
      console.log("printIframe", printIframe);
			const document = printIframe.contentDocument;
			if (document) {
        console.log("document", document);
        const html = document.getElementsByTagName('html')[0];
        console.log("HTML", html);
        const innerDiv = document.getElementById('print_pdf');
        console.log("innerDiv", innerDiv?.outerHTML);

        const options = {
          margin: 10,
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
          filename: 'transaction.pdf',
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: {
            scale: 4 // for PDF resolution
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
          },
          source: innerDiv?.outerHTML, //document.documentElement.outerHTML,
          download: true,
        };

        await Html2Pdf.getPdf(options);
			}
		},
    removeAfterPrint: true,
  });

  return (
    <>
      <div className="test-session-wrapper">
        <div id="print_pdf" className="inner" ref={componentRef}>
          <div className="flex-col leading-12 mb-3">
            <div className="text-center text-2xl font-bold leading-10">아이해브 청력테스트 Pro</div>
            <div className="text-center text-lg font-bold mb-8">
              [Korean Digit-In-Noise test]
            </div>
            <div className="test-session-pi">
              <div>Patient identification</div>
              <div>
                <div>ID: </div>
                <div>Name: </div>
                <div>Sex/Birth: </div>
              </div>
              <div>
                <div>Test Date: </div>
                <div>Tested By: </div>
              </div>
            </div>
            <div className="test-session-table-wrapper">
              <table className="test-session-table">
                <thead className="bg-slate-100">
                  <tr>
                    <th colSpan={2} className="padding-th text-lg w-28">Receiver</th>
                    <th colSpan={2} className="padding-th text-lg w-28">Mode</th>
                    <th rowSpan={2} className="padding-th w-36">
                      <p className="text-lg">DIN SRT</p>
                      <p className="text-lg">(dB SNR)</p>
                    </th>
                    <th colSpan={5} className="padding-th text-lg">Estimated Hearing Level</th>
                  </tr>
                  <tr className="h-24">
                    <th>Signal</th>
                    <th>Noise</th>
                    <th>List</th>
                    <th>Score</th>
                    <th className="text-vertical-th" id="child-1"><span>Normal</span></th>
                    <th className="text-vertical-th" id="child-2"><span>Mild</span></th>
                    <th className="text-vertical-th" id="child-3"><span>Moderate</span></th>
                    <th className="text-vertical-th" id="child-4"><span>Moderately<br className="h-0"/>Severe</span></th>
                    <th className="text-vertical-th" id="child-5"><span>Severe</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="item-tr">
                    <td colSpan={2}>Speaker</td>
                    <td colSpan={2}>Signal Fixed</td>
                    <td rowSpan={2}><span className='text-2xl float-none'>-4.6</span></td>
                    <td rowSpan={2}><div className='bar-div' /></td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}></td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>B</td>
                    <td>3</td>
                    <td>D</td>
                  </tr>
                  <tr>
                    <td colSpan={10} className="note-td">
                      <span>NOTE :
                      </span>
                    </td>
                  </tr>

                  <tr className="item-tr">
                    <td colSpan={2}>Speaker</td>
                    <td colSpan={2}>Signal Fixed</td>
                    <td rowSpan={2}>-4.6</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>B</td>
                    <td>3</td>
                    <td>D</td>
                  </tr>
                  <tr>
                    <td colSpan={10} className="note-td">
                      <span>NOTE :
                      </span>
                    </td>
                  </tr>

                  <tr className="item-tr">
                    <td colSpan={2}>Speaker</td>
                    <td colSpan={2}>Signal Fixed</td>
                    <td rowSpan={2}>-4.6</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>B</td>
                    <td>3</td>
                    <td>D</td>
                  </tr>
                  <tr>
                    <td colSpan={10} className="note-td">
                      <span>NOTE :
                      </span>
                    </td>
                  </tr>

                  <tr className="item-tr">
                    <td colSpan={2}>Speaker</td>
                    <td colSpan={2}>Signal Fixed</td>
                    <td rowSpan={2}>-4.6</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>B</td>
                    <td>3</td>
                    <td>D</td>
                  </tr>
                  <tr>
                    <td colSpan={10} className="note-td">
                      <span>NOTE :
                      </span>
                    </td>
                  </tr>

                  <tr className="item-tr">
                    <td colSpan={2}>Speaker</td>
                    <td colSpan={2}>Signal Fixed</td>
                    <td rowSpan={2}>-4.6</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>B</td>
                    <td>3</td>
                    <td>D</td>
                  </tr>
                  <tr>
                    <td colSpan={10} className="note-td">
                      <span>NOTE :
                      </span>
                    </td>
                  </tr>

                  <tr className="item-tr">
                    <td colSpan={2}>Speaker</td>
                    <td colSpan={2}>Signal Fixed</td>
                    <td rowSpan={2}>-4.6</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>B</td>
                    <td>3</td>
                    <td>D</td>
                  </tr>
                  <tr>
                    <td colSpan={10} className="note-td">
                      <span>NOTE :
                      </span>
                    </td>
                  </tr>

                  <tr className="item-tr">
                    <td colSpan={2}>Speaker</td>
                    <td colSpan={2}>Signal Fixed</td>
                    <td rowSpan={2}>-4.6</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                    <td rowSpan={2}>|</td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>B</td>
                    <td>3</td>
                    <td>D</td>
                  </tr>
                  <tr>
                    <td colSpan={10} className="note-td">
                      <span>NOTE :
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* <div className="html2pdf__page-break"></div> */}
        </div>
        <div className="print-button-wrapper">
          <button type="button" onClick={handlePrintPDF}>
            PDF 저장
          </button>
        </div>
      </div>
    </>
  );
};

export default TestSession;
