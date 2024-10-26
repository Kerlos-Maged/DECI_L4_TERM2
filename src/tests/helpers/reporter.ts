import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption
} from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return log;
  }
}

const jasmineEnv = jasmine.getEnv();
jasmineEnv.clearReporters();

const specReporter = new SpecReporter({
  spec: {
    displayStacktrace: StacktraceOption.NONE
  },
  customProcessors: [CustomProcessor]
});

jasmineEnv.addReporter(specReporter);
