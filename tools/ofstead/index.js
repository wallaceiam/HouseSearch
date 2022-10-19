const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const dir = path.resolve(__dirname, '..', '..', 'data');

const ofstedDir = path.resolve(dir, 'ofsted', '2020-2021');

const readPostcodes = () => {
  return new Promise((resolve) => {
    let postcodes = {};
    fs.createReadStream(path.resolve(dir, "postcodes.csv"))
      .pipe(csv.parse({ headers: true }))
      .on('error', error => console.error(error))
      .on('data', ({ pcds, ...rest }) => {
        postcodes[pcds] = rest;
      })
      .on('end', () => resolve(postcodes));
  });
}

const blankOrUndefined = (a) => a === '' ? undefined : a;

const processSchoolInformation = () =>
  new Promise((resolve) => {
    const schools = [];
    fs.createReadStream(path.resolve(ofstedDir, 'england_school_information.csv'))
      .pipe(csv.parse({ headers: true }))
      .transform((row, next) => {
        try {
          const school = {
            urn: row['URN'],
            locationName: row['LANAME'],
            locationId: row['LA'],
            establishmentId: row['ESTAB'],
            name: row['SCHNAME'],
            address: row['STREET'],
            address2: blankOrUndefined(row['LOCALITY']),
            address3: blankOrUndefined(row['ADDRESS3']),
            town: row['TOWN'],
            postcode: row['POSTCODE'],
            isOpen: row['SCHSTATUS'] === 'Open',
            openDate: blankOrUndefined(row['OPENDATE']),
            closedDate: blankOrUndefined(row['CLOSEDATE']),
            minorGroup: row['MINORGROUP'],
            schoolType: row['SCHOOLTYPE'],
            isPrimary: row['ISPRIMARY'] === '1',
            isSecondary: row['ISSECONDARY'] === '1',
            isPost16: row['ISPOST16'] === '1',
            ageLow: +row['AGELOW'],
            ageHigh: +row['AGEHIGH'],
            gender: row['GENDER'],
            religiousCharacter: row['RELCHAR'],
            administrationPolicy: row['ADMPOL'],
            ofstedRating: row['OFSTEDRATING'],
            dateOfLastInspection: row['OFSTEDLASTINSP'],
          };

          next(null, school);
        }
        catch (err) {
          next(err);
        }
      })
      .on('data', (chunk) => {
        schools.push(chunk);
      })
      .on('end', () => {
        resolve(schools);
      });
  });

const saveSchools = (schools) =>
  new Promise((resolve) => {
    const stream = fs.createWriteStream(path.resolve(dir, 'school_info.json'));
    stream.write(JSON.stringify(schools, undefined, 2));
    resolve();
  });

const processCensusInformation = () =>
  new Promise((resolve) => {
    const censuses = [];
    fs.createReadStream(path.resolve(ofstedDir, 'england_census.csv'))
      .pipe(csv.parse({ headers: true }))
      .transform((row, next) => {
        try {
          const census = {
            urn: row['URN'],
            locationId: row['LA'],
            establishmentId: row['ESTAB'],
            schoolType: row['SCHOOLTYPE'],
            totalNumOnRoll: +row['NOR'],
            totalNumOfGirldONRoll: +row['NORG'],
            totalNumOfBoysOnRoll: +row['NORB'],
            numOfSENPupilsWithEHCPlan: +row['TSENELSE'],
            numOfEligiblePupilsWithSENSupport: +row['TSENELK'],
            numOfEnglishNotFirstLang: +row['NUMEAL'],
            numOfEnglishFirstLang: +row['NUMENGFL'],
            numOfUnclassifiedFirstLang: +row['NUMUNCFL'],
            numOfEligibleFreeSchoolMeal: +row['NUMFSM'],
            numOfEligibleFreeSchoolMealInPast6m: +row['NUMFSMEVER'],
          };

          next(null, census);
        }
        catch (err) {
          next(err);
        }
      })
      .on('data', (chunk) => {
        censuses.push(chunk);
      })
      .on('end', () => {
        resolve(censuses);
      });
  });

const processFinancialInformation = () =>
  new Promise((resolve) => {
    const financials = [];
    fs.createReadStream(path.resolve(ofstedDir, 'england_cfr.csv'))
      .pipe(csv.parse({ headers: true }))
      .transform((row, next) => {
        try {
          const cfi = {
            urn: row['URN'],
            locationId: row['LA'],
            isLondon: row['LONDON/NON-LONDON'] === 'London',
            median: row['MEDIAN'],
            numOfFTEPupils: +row['PUPILS'],
            perOfEligiblePupilsForFreeSchoolMeal: +row['FSM'],
            freeSchoolMealsEligibilityBand: row['FSMBAND'],
            perPupil: {
              grantFunding: +row['GRANTFUNDING'],
              selfGeneratedIncome: +row['SELFGENERATEDINCOME'],
              totalIncome: +row['TOTALINCOME'],

              teachingStaff: +row['TEACHINGSTAFF'],
              supplyTeachers: +row['SUPPLYTEACHERS'],
              educationSupportStaff: +row['EDUCATIONSUPPORTSTAFF'],
              premises: +row['PREMISES'],
              backOffice: +row['BACKOFFICE'],
              catering: +row['CATERING'],
              otherStaff: +row['OTHERSTAFF'],
              energy: +row['ENERGY'],
              nonIctLearningResources: +row['LEARNINGRESOURCES'],
              ictLearningResources: +row['ICT'],
              boughtInProfServices: +row['BOUGHTINPROFESSIONALSERVICES'],
              other: +row['OTHER'],
              totalExpenditure: +row['TOTALEXPENDITURE'],
            },
            perOfTotalIncome: {
              grantFunding: +row['PGRANTFUNDING'],
              selfGeneratedIncome: +row['PSELFGENERATEDINCOME'],
            },
            perOfTotalExpenditure: {
              teachingStaff: +row['PTEACHINGSTAFF'],
              supplyTeachers: +row['PSUPPLYTEACHERS'],
              educationSupportStaff: +row['PEDUCATIONSUPPORTSTAFF'],
              premises: +row['PPREMISES'],
              backOffice: +row['PBACKOFFICE'],
              catering: +row['PCATERING'],
              otherStaff: +row['POTHERSTAFF'],
              energy: +row['PENERGY'],
              nonIctLearningResources: +row['PLEARNINGRESOURCES'],
              ictLearningResources: +row['PICT'],
              boughtInProfServices: +row['PBOUGHTINPROFESSIONALSERVICES'],
              other: +row['POTHER'],
            }
          };

          next(null, cfi);
        }
        catch (err) {
          next(err);
        }
      })
      .on('data', (chunk) => {
        financials.push(chunk);
      })
      .on('end', () => {
        resolve(financials);
      });
  });

const processTeacherInformation = () =>
  new Promise((resolve) => {
    const teachers = [];
    fs.createReadStream(path.resolve(ofstedDir, 'england_swf.csv'))
      .pipe(csv.parse({ headers: true }))
      .transform((row, next) => {
        try {
          const teacher = {
            urn: row['URN'],
            locationId: row['LA Number'],
            establishmentId: row['Establishment Number'],
            schoolPhase: row['School Phase'],
            totalNumOfTeachers: +row['Total Number of Teachers (Headcount)'],
            totalNumOfTeachingAssistants: +row['Total Number of Teaching Assistants (Headcount)'],
            totalNumOfNonClassroomStaff: +row['Total Number of Non Classroom-based School Support Staff, Excluding Auxiliary Staff (Headcount)'],
            totalNumOfTeachersFTE: +row['Total Number of Teachers (Full-Time Equivalent)'],
            totalNumOfTeachingAssistantsFTE: +row['Total Number of Teaching Assistants (Full-time Equivalent)'],
            totalNumOfNonClassroomStaffFTE: +row['Total Number of Non Classroom-based School Support Staff, Excluding Auxiliary Staff (Full-Time Equivalent)'],
            pupilTeacherRation: +row['Pupil:     Teacher Ratio'],
            meanGrossFTESalary: row['Mean Gross FTE Salary of All Teachers (£s)'],
          };
          next(null, teacher);
        }
        catch (err) {
          next(err);
        }
      })
      .on('data', (chunk) => {
        teachers.push(chunk);
      })
      .on('end', () => {
        resolve(teachers);
      });
  });

const processKeyStage4Information = () =>
  new Promise((resolve) => {
    const data = [];
    fs.createReadStream(path.resolve(ofstedDir, 'england_ks4-ebacc-entries.csv'))
      .pipe(csv.parse({ headers: true }))
      .transform((row, next) => {
        try {
          const d = {
            urn: row['URN'],
            locationId: row['LEA'],
            establishmentId: row['ESTAB'],
            telePhone: row['TELNUM'],
            keyStage4: {
              admissionPolicy: row['ADMPOL'],
              admissionPolicy18: row['ADMPOL_18'],
              isFeederForSixthForm: row['FEEDER'] === '1',
              isInKeyStage2PerformanceTables: row['TABKS2'] === '1',
              isInKeyStage45PerformanceTables: row['TAB1618'] === '1',
              numOfPupilsAtEndOfKeyStage4: +row['TPUP'],
              perOfKeyStage4Pupils: {
                inAll: +row['PTEBACC_E_PTQ_EE'].replace('%', ''),
                inEnglish: +row['PTEBACENG_E_PTQ_EE'].replace('%', ''),
                inMaths: +row['PTEBACMAT_E_PTQ_EE'].replace('%', ''),
                inScience: +row['PTEBAC2SCI_E_PTQ_EE'].replace('%', ''),
                inHumanities: +row['PTEBACHUM_E_PTQ_EE'].replace('%', ''),
                inLanguage: +row['PTEBACLAN_E_PTQ_EE'].replace('%', ''),
              }
            }
          };
          next(null, d);
        }
        catch (err) {
          next(err);
        }
      })
      .on('data', (chunk) => {
        data.push(chunk);
      })
      .on('end', () => {
        resolve(data);
      });
  });

const processKeyStage5Information = () =>
  new Promise((resolve) => {
    const data = [];
    fs.createReadStream(path.resolve(ofstedDir, 'england_ks5-subject-entries.csv'))
      .pipe(csv.parse({ headers: true }))
      .transform((row, next) => {
        try {
          const d = {
            urn: row['URN'],
            locationId: row['LA'],
            establishmentId: row['LAESTAB'].replace(row['LA'], ''),
            keyStage5: {
              description: row['DESCRIPTION'],
              numOfEntries: +row['NUMBER_OF_ENTRIES'],
              qualificationLevel: row['QUALIFICATION,LEVEL'],
              qualificationType: row['QUALIFICATION_TYPE'],
            }
          };
          next(null, d);
        }
        catch (err) {
          next(err);
        }
      })
      .on('data', (chunk) => {
        data.push(chunk);
      })
      .on('end', () => {
        const reduced = data.reduce((prev, { urn, locationId, establishmentId, keyStage5 }) => {
          const f = prev.find(({ urn: u, locationId: l, establishmentId: e }) =>
            urn === u && locationId === l && establishmentId === e);

          if (f) {
            f.keyStage5.push(keyStage5);
          } else {
            prev.push({
              urn,
              locationId,
              establishmentId,
              keyStage5: [
                keyStage5
              ]
            });
          }
          return prev;
        }, []);
        console.table(reduced);
        resolve(reduced);
      });
  });

const merge = (schools, census, financials, teachers, keyStage4, keyStage5) =>
  schools.map(({ urn, locationId, establishmentId, ...rest }) => {
    const c = census
      .find(({ urn: u, locationId: la, establishmentId: estab }) =>
        urn === u && locationId === la && establishmentId === estab);

    if (c === undefined) {
      console.warn(`census data for ${urn}|${locationId}|${establishmentId} not found`);
      return {
        urn,
        locationId,
        establishmentId,
        ...rest,
      };
    }

    const { schoolType, urn: _u, locationId: _la, establishmentId: _estab, ...restC } = c;
    return {
      urn,
      locationId,
      establishmentId,
      ...rest,
      schoolType1: schoolType,
      census: restC,
    };
  }).map(({ urn, locationId, establishmentId, ...rest }) => {
    const f = financials
      .find(({ urn: u, locationId: la }) =>
        urn === u && locationId === la);

    if (f === undefined) {
      console.warn(`financial data for ${urn}|${locationId}|${establishmentId} not found`);
      return {
        urn,
        locationId,
        establishmentId,
        ...rest,
      };
    }

    const { urn: _u, locationId: _la, ...restF } = f;
    return {
      urn,
      locationId,
      establishmentId,
      ...rest,
      financials: restF,
    };
  }).map(({ urn, locationId, establishmentId, ...rest }) => {
    const t = teachers
      .find(({ urn: u, locationId: la, establishmentId: estab }) =>
        urn === u && locationId === la && establishmentId === estab);

    if (t === undefined) {
      console.warn(`teacher data for ${urn}|${locationId}|${establishmentId} not found`);
      return {
        urn,
        locationId,
        establishmentId,
        ...rest,
      };
    }

    const { urn: _u, locationId: _la, establishmentId: _estab, ...restT } = t;
    return {
      urn,
      locationId,
      establishmentId,
      ...rest,
      teachers: restT,
    };
  }).map(({ urn, locationId, establishmentId, ...rest }) => {
    const k = keyStage4
      .find(({ urn: u, locationId: la, establishmentId: estab }) =>
        urn === u && locationId === la && establishmentId === estab);

    if (k === undefined) {
      console.warn(`keystage4 data for ${urn}|${locationId}|${establishmentId} not found`);
      return {
        urn,
        locationId,
        establishmentId,
        ...rest,
      };
    }

    const { telePhone, keyStage4: ks4 } = k;
    return {
      urn,
      locationId,
      establishmentId,
      ...rest,
      telePhone,
      keyStage4: ks4,
    };
  }).map(({ urn, locationId, establishmentId, ...rest }) => {
    const k = keyStage5
      .find(({ urn: u, locationId: la, establishmentId: estab }) =>
        urn === u && locationId === la && establishmentId === estab);

    if (k === undefined) {
      return {
        urn,
        locationId,
        establishmentId,
        ...rest,
      };
    }

    const { keyStage6: ks5 } = k;
    return {
      urn,
      locationId,
      establishmentId,
      ...rest,
      keyStage5: ks5
    };
  });;

async function main() {
  const pc = await readPostcodes();
  const schools = await processSchoolInformation();
  const census = await processCensusInformation();
  const financials = await processFinancialInformation();
  const teachers = await processTeacherInformation();
  const keyStage4 = await processKeyStage4Information();
  const keyStage5 = await processKeyStage5Information();

  // const data = merge(schools, census, financials, teachers, keyStage4, keyStage5);
  // await saveSchools(data);
  // await processSchools(pc);
}

main();