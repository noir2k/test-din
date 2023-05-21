import Header from 'renderer/components/main/header';
import SNB from 'renderer/components/snb/snb';

export default function MainPage() {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-3/12">
          <SNB />
        </div>
        <div className="w-9/12">
          <main className="h-screen">
            <div
              id="mainContent"
              className="flex justify-center items-center h-full"
            >
              <h1 id="testText" className="text-slate-950 -translate-y-full">
                본 검사는 XXX 청각 테스트 검사입니다. <br />
                검사 전에 윈도우 알림 등 다른 사운드를 발생시키는 서비스를
                종료해 주세요. <br />
                검사 전에 기기 사운드 볼륨을 적당한 수준으로 조정해 주세요.
              </h1>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
