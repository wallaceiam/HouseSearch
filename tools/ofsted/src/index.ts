import { pipeline } from "stream/promises";
import config from "./config";

import { childcare } from "./readers/childcare";
import { coordinates } from "./transformers/coordinates";
import {
  // createLocalAuthorityLookupCsv,
  localAuthorityId,
} from "./transformers/localAuthorityId";
import { mongo } from "./writers/mongo";
import { schoolWriterFunc } from "./writers/school";
import { createReadStream } from "./readers/createStream";
import { census } from "./transformers/census";
import { financials } from "./transformers/financials";
import { teachers } from "./transformers/teachers";
import { school } from "./readers/school";
import { localAuthorityWriterFunc } from "./writers/localAuthority";
import { localAuthority } from "./readers/localAuthority";
import { managementinfo } from "./transformers/managementInfo";

const localAuthorities = async () => {
  console.log('Processing Local Authorities...');
  const writer = await mongo(localAuthorityWriterFunc);

  const input = await createReadStream(config.localAuthoritiesFileName);

  await pipeline(input, localAuthority, writer);

  await writer.disconnect();
};

const schools = async () => {
  const schoolWriter = await mongo(schoolWriterFunc);

  const managementInfo = await managementinfo();
  const geolocation = await coordinates();
  const cen = await census();
  const fin = await financials();
  const teach = await teachers();

  console.log('Processing Schools...');
  const schoolInput = await createReadStream(config.schoolFileName);
  
  await pipeline(schoolInput, school, geolocation, managementInfo, cen, fin, teach, schoolWriter);

  await schoolWriter.disconnect();
}

const childcareSchools = async () => {

  const la = await localAuthorityId();
  const geolocation = await coordinates();

  const schoolWriter = await mongo(schoolWriterFunc);
  
  console.log('Processing Childcare...');
  const childcareInput = await createReadStream(config.childcareFileName);

  await pipeline(childcareInput, childcare, geolocation, la, schoolWriter);

  await schoolWriter.disconnect();
}

async function main() {
  // await createLocalAuthorityLookupCsv();
  
  await localAuthorities();

  await childcareSchools();

  await schools();

}

main();
