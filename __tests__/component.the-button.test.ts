import 'jest-canvas-mock';
import createComponent from "../app/src/components/the-button";

// typings
type AsyncReturnType<T extends (...args: any) => any> =
  T extends (...args: any) => Promise<infer U> ? U :
  T extends (...args: any) => infer U ? U :
  any
type PureConfig = AsyncReturnType<typeof createComponent>;
type ComponentMethodsType = Pick<PureConfig, 'methods'>
type ComponentType = Omit<PureConfig, 'methods'> & ComponentMethodsType["methods"]
let Instance: ComponentType = {} as unknown as ComponentType;


// mocking 
const componentTargetMocker = {
  async handler(ConfigObj) {
    Instance = this;
    // intercept setData to get the render's data
    Instance.data = ConfigObj.data;
    Instance.setData = async (data, cb) => new Promise((resolve) => {
      Object.assign(Instance.data, data)
      resolve(Instance.data);
      cb(Instance.data)
      if (ConfigObj.didUpdate) ConfigObj.didUpdate();
    });
    // mocking life cycle and do binding
    Instance.onInit = ConfigObj.onInit.bind(Instance);
    if (ConfigObj.didMount) Instance.didMount = ConfigObj.didMount.bind(Instance);
    if (ConfigObj.didUpdate) Instance.didUpdate = ConfigObj.didUpdate.bind(Instance);
    if (ConfigObj.methods) Object.entries(ConfigObj.methods).forEach(([key, method]) => {
      if (typeof method === 'function') {
        ConfigObj.methods[key] = ConfigObj.methods[key].bind(Instance);
        Instance[key] = method;
      }
    })
    // trigger life cycle
    await Instance.onInit();
    await Instance?.didMount?.();
  }
}
componentTargetMocker.handler = componentTargetMocker.handler.bind({});
const mockComponentCreator = jest.fn(componentTargetMocker.handler);


globalThis.my.createCanvasContext = (id) => {
  const canvas = document.createElement('CANVAS') as HTMLCanvasElement;
  canvas.id = id;
  const ctx = canvas.getContext('2d');
  const _getImgData = ctx.getImageData;
  ctx.getImageData = (opt: any) => {
    return opt.success(_getImgData(0, 0, opt.width, opt.height))
  }
  return ctx
}
globalThis.Component = mockComponentCreator;


// tests
describe("Myapp: common stupid test cases:", () => {

  beforeAll(() => {
    createComponent();
  })
  test("Component() has been called", (done) => {
    expect(mockComponentCreator).toHaveBeenCalledTimes(1)
    done();
  });
  test("tab generate QR with size expected", (done) => {
    Instance.generateQR("https://developers.tiki.diferent-here");
    expect((Instance.data.size)).toEqual(148)
    done();
  });

  test("component data matches snapshot", (done) => {
    Instance.tapButton()
    expect((JSON.stringify(Instance.data, null, 2))).toMatchSnapshot()
    done();
  });
});
