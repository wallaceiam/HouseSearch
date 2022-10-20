import * as fs from "fs";
import * as csv from "fast-csv";

interface ParserProps<T> {
  readonly fileName: string;
  readonly parseOptions?: csv.ParserOptionsArgs;
  readonly transformer: (row: csv.ParserRow<any>) => T | undefined;
}

export const parser = <T>({
  fileName,
  transformer,
  parseOptions = { headers: true, ignoreEmpty: true },
}: ParserProps<T>) =>
  new Promise<T[]>((resolve) => {
    const data: T[] = [];
    fs.createReadStream(fileName).pipe(
      csv
        .parse(parseOptions)
        .transform((row, next) => {
          try {
            const d = transformer(row);
            if (d === undefined) {
              next();
              return;
            }
            next(null, d as any);
          } catch (err: any) {
            next(err);
          }
        })
        .on("data", (chunk) => {
          data.push(chunk);
        })
        .on("end", () => {
          resolve(data);
        })
    );
  });
