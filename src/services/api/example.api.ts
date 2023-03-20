import { showMessage } from "react-native-flash-message";
import { Appconfig } from "../../config/config";
import { request } from "../request/request";

async function exampleApi(args: any) {
    const projectId = args.projectId;
    try {
      return await request.get(
        `${Appconfig.BASE_URL}owner/fetch-prime-contracts/${projectId}`,
      );
    } catch (err) {
      showMessage({
        message: 'Network request failed',
        type: 'danger',
      });
    }
  }