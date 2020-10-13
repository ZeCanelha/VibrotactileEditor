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

  static parseDataString(dataString) {
    const delimiter = ";";
    const splitValues = dataString.split(delimiter);

    let returnObject = [];
    splitValues.forEach((element) => {
      const values = element.split(",");
      returnObject.push({
        time: parseInt(values[0]),
        intensity: parseInt(values[1]),
      });
    });
    return returnObject;
  }

  static defaultPattern() {
    return {
      patternID: Util.generateUUI(),
      datapoints: [
        {
          time: 0,
          intensity: 50,
        },
        {
          time: 175,
          intensity: 50,
        },
        {
          time: 350,
          intensity: 50,
        },
      ],
      area: "",
      x: 0,
      emptyTime: 0,
      dataString: "",
    };
  }
}

export default Util;
