import { useEffect, useState } from 'react';
import { useAppSelector } from '@hook/index';

import type { RootState } from '@store/index';

import isEmpty from 'lodash.isempty';

import { TestForm } from '@interfaces';
import { DataRange } from '@lib/common';

const TestResult = ({...props}) => {
  const [result, setResult] = useState<TestForm>({} as TestForm);
  const [estimate, setEstimate] = useState('');

  const navigate = useAppSelector((state: RootState) => state.navigate);

  const findEst = (result: number | undefined) => {
    for (const e of Object.entries(DataRange)) {
      const key = e[0];
      const MIN = e[1][0];
      const MAX = e[1][1];
      if (!!result && (MIN <= result && MAX >= result)) {
        return key;
      }
    }
    return 'ERROR';
  }

  useEffect(() => {
    if (!isEmpty(props.data)) {
      setEstimate(findEst(props.data.test_result));
      setResult(props.data);
    } else if (!isEmpty(navigate.itemResult)) {
      setEstimate(findEst(navigate.itemResult.test_result));
      setResult(navigate.itemResult);
    }
  }, [props.data, navigate.itemResult])

  return (
    <>
      <div className="test-result-wrapper">
        <div className="flex-col leading-12 mb-3 text-center">
          <div className="text-xl font-bold">아이해브 청력테스트 Pro</div>
          <div className="text-lg font-bold">[Korean Digit-In-Noise test]</div>
        </div>
        <hr/>
        <div className="flex-row flex-wrap leading-8">
          <div><span className="font-bold">ID:</span>&nbsp; {result.patient_no}</div>
          <div><span className="font-bold">Name:</span>&nbsp; {result.user_name}</div>
          <div><span className="font-bold">Sex/Birth:</span>&nbsp; {result.gender} / {result.birthday}</div>
        </div>
        <hr/>
        <div className="flex-row flex-wrap leading-8">
          <div><span className="font-bold">Test Date:</span>&nbsp; {result.test_date}</div>
          <div><span className="font-bold">Tested by:</span>&nbsp; {result.tester_name}</div>
        </div>
        <hr/>
        <div className="flex-row flex-wrap leading-8">
          <div><span className="font-bold">Reciever:</span>&nbsp; {result.receiver}</div>
          <div><span className="font-bold">Mode:</span>&nbsp; {result.fixed_type}</div>
          <div><span className="font-bold">Stim Type:</span>&nbsp; {result.direction}</div>
          <div><span className="font-bold">Score:</span>&nbsp; {result.scoring}</div>
          <div><span className="font-bold">List:</span>&nbsp; {result.sound_set}</div>
        </div>
        <hr/>
        <div className="flex-row flex-wrap leading-8">
          <div><span className="font-bold">DIN SRT:</span>&nbsp; {result.test_result}</div>
          <div><span className="font-bold">Esimated Hearing Level:</span>&nbsp; {estimate}</div>
        </div>
        <hr/>
        <div className="flex-row flex-wrap leading-8">
          <div><span className="font-bold">NOTE:</span>&nbsp; {result.memo}</div>
        </div>
      </div>
    </>
  );
};

export default TestResult;
