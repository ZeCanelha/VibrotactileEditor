import * as yup from "yup";
class Util {
  // https://gist.github.com/solenoid/1372386
  static generateUUI() {
    let patternId = function () {
      let timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
      return (
        timestamp +
        "xxxxxxxxxxxxxxxx"
          .replace(/[x]/g, function () {
            return ((Math.random() * 16) | 0).toString(16);
          })
          .toLowerCase()
      );
    };

    return (patternId = patternId());
  }

  static formValidationSchema() {
    return yup.object({
      hardwareDevice: yup.string().required(),
      projectName: yup.string().required(),
      nActuators: yup.string().required(),
      deviceImage: yup.string().notRequired(),
    });
  }
}

export default Util;
