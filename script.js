import fetch from 'node-fetch'
import fs from 'fs'
import admZip from 'adm-zip'
import iconv from 'iconv-lite'
import xml2js from 'xml2js'

const url = 'http://www.cbr.ru/s/newbik'
const tempPath = './_temp-biclist.zip'

// [{bic: $1, name: $2, corrAccount: $3}, ...]

const downloadFile = (async (url, path) => {
    const res = await fetch(url)
    const fileStream = fs.createWriteStream(path)
    await new Promise((resolve, reject) => {
        res.body.pipe(fileStream)
        res.body.on("error", reject)
        fileStream.on("finish", resolve)
    })
})
async function getBicList() {
    let results = []
    await downloadFile(url, tempPath)

    if (fs.existsSync(tempPath)) {
        let zip = new admZip(tempPath)
        const zipEntries = zip.getEntries()
        const parser = new xml2js.Parser()

        zipEntries.forEach(function (zipEntry) {
            let data = zipEntry.getData()
            data = iconv.decode(data, 'win1251')
            parser.parseString(data, function (err, result) {
                for (const entry of result.ED807.BICDirectoryEntry) {
                    if (entry.hasOwnProperty('Accounts')) {
                        for (const account of entry.Accounts) {
                            results.push({
                                bic: entry.$.BIC,
                                name: entry.ParticipantInfo[0].$.NameP,
                                corrAccount: account.$.Account,
                            })
                        }
                    }
                }
            })
        })
        fs.unlink(tempPath, (err) => {
            if (err) throw err;
            console.log('temp file was deleted');
        })
        return results
    } else {
        console.log("DOES NOT exist:", tempPath);
    }
}
getBicList().then(result => {
    console.log(result)
})