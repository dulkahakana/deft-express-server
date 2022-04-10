import path from 'path'
import express from 'express'


import Dictionary from './service/dictionary.serviсe.js'
import { myLogBlue, myLogRed, myLogGreen, myBlueText, myRedText, myGreenText } from './service/mylog.service.js'
import FormatDate from './service/date.serviсe.js'


const PORT = 5000
const dictionaryName = 'ENGLISH_v2.JSON'
const dictionaryPath = path.resolve('src', dictionaryName)
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/dictionary/API', async (req, res) => {
    try {
        const dictionary= await Dictionary.getDictionary(dictionaryPath)

        res.send(dictionary)
    } catch(err) {
        myLogRed(FormatDate.getDate())
        myRedText(err)
    }
})

app.get('/dictionary/API/sectionslist', async (req, res) => {
    try {
        const sectionsListName = await Dictionary.getSectionsName(dictionaryPath)

        res.send(sectionsListName)        
    } catch(err) {
        myLogRed(FormatDate.getDate())
        myRedText(err)
    }
})

app.get('/dictionary/API/:section', async (req, res) => {
    try {
        const sectionName = req.params.section
        const sectionDictionary = await Dictionary.getSection(dictionaryPath, sectionName)

        myLogBlue(FormatDate.getDate())
        myGreenText(`Запрос секции: ${sectionName}`)
        res.send(sectionDictionary)
    } catch(err) {
        myLogRed(FormatDate.getDate())
        myRedText(err)
    }
})

app.post('/dictionary/API/addword', async (req, res) => {
    try {
        const {english, russian} = req.body
        
        await Dictionary.addWord(dictionaryPath, english, russian)
        myLogBlue(FormatDate.getDate())
        myBlueText('В словарь добавлено новое слово:')
        myGreenText(`${english} - ${russian}`)
    } catch(err) {
        myLogRed(FormatDate.getDate())
        myRedText(err)
    }
})


app.listen(PORT, () => {
    myLogBlue(FormatDate.getDate())
    myLogGreen(`Сервер "Dictionary english for development" запущен на http://localhost:${PORT}/`)
    myBlueText(`Запрос словаря: http://localhost:${PORT}/dictionary/API`)
    myBlueText(`Запрос списка имен секций словаря: http://localhost:${PORT}/dictionary/API/sectionslist`)
    myBlueText(`Запрос секции словаря: http://localhost:${PORT}/dictionary/API/:section-name`)
    myGreenText(`Добавление нового слова: http://localhost:${PORT}/dictionary/API/addword`)
    myBlueText('Остановить сервер ctrl: + c')
})


// ? удалить слово и перезапишет файл
// Dictionary.removeWord(dictionaryPath, 'value')

// ? добавить слово и перезаписать файл
// Dictionary.addWord(dictionaryPath, 'exist', 'существовать')
// Dictionary.addWord(dictionaryPath, 'implements', 'реализовать')

// Dictionary.log(dictionaryPath)