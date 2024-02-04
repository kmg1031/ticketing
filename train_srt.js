// import modules
const request = require('request');
const cheerio = require('cheerio');

// declare variables
var url = 'https://etk.srail.kr/hpg/hra/01/selectScheduleList.do?pageId=TK0101010000';

// request data
var req_data = {
	dptRsStnCd: '0551',
	arvRsStnCd: '0020',
	stlbTrnClsfCd: '05',
	psgNum: '3',
	seatAttCd: '015',
	isRequest: 'Y',
	dptRsStnCdNm: '수서',
	arvRsStnCdNm: '부산',
	dptDt: '20240209',
	dptTm: '000000',
	chtnDvCd: '1',
	psgInfoPerPrnb1: '0',
	psgInfoPerPrnb5: '0',
	psgInfoPerPrnb4: '3',
	psgInfoPerPrnb2: '0',
	psgInfoPerPrnb3: '0',
	locSeatAttCd1: '000',
	rqSeatAttCd1: '015',
	trnGpCd: '109',
	dlayTnumAplFlg: 'Y'
}

request.post({url: url, form: req_data}, function(err, res, body) {
	if (err) {
		console.log(err);
	} else {
		/* 
			구분
			열차종류 
			열차번호
			출발시간 
			도착시간 
			출발역 
			도착역
			소요시간 
			특실 
			일반실 
			예약대기
		*/
		const data = [];

		// parsing html
		const $ = cheerio.load(body);
		const tableRows = $('.tbl_wrap>table>tbody>tr');


		tableRows.each((i, row) => {
			var row_data = {};

			row_data['type'] = $(row).find('td').eq(0).contents().first().text().trim();
			row_data['train_type'] = $(row).find('td').eq(1).contents().first().text().trim();
			row_data['train_num'] = $(row).find('td').eq(2).text().trim();
			row_data['start_time'] = $(row).find('td').eq(3).find('em').text().trim();
			row_data['end_time'] = $(row).find('td').eq(4).find('em').text().trim();
			row_data['start_station'] = $(row).find('td').eq(3).find('div').text().trim();
			row_data['end_station'] = $(row).find('td').eq(4).find('div').text().trim();
			row_data['special'] = $(row).find('td').eq(5).text().trim();
			row_data['normal'] = $(row).find('td').eq(6).text().trim();
			row_data['wait'] = $(row).find('td').eq(7).text().trim();
			row_data['time'] = $(row).find('td').eq(11).text().replace(/\t/g, '').replace(/\n/g, '').trim();

			data.push(row_data);
		});

		console.log(data);
	}
});


