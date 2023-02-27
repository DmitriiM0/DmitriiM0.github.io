import React, { useState } from 'react'
import './App.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';

const Input = styled(MuiInput)`
  width: 54px;
`;

export default function App() {
  const [interval, setInterval] = useState('month');
  const [open, setOpen] = useState(false);
  const [interest, setInterest] = useState(5);
  const [deposit, setDeposit] = useState(10000);
  const [payment, setPayment] = useState(0);
  const [years, setYears] = useState(10)

  let paymentSum = 0;

  const handleSliderChange = (event) => {
	setInterest(+event.target.value);
  };

  const handleYearsChange = (event) => {
	setYears(event.target.value);
  }
  
  const handleInputChange = (event) => {
	setInterest(event.target.value === '' ? '' : Number(event.target.value));
  };
  
  const handleBlur = () => {
	if (interest < 0) {
	  setInterest(0);
	} else if (interest > 100) {
	  setInterest(100);
	}
  };

  const handleYearsBlur = () => {
	if (years < 0) {
	  setYears(0);
	} else if (years > 100) {
	  setYears(100);
	}
  }

  switch(interval) {
	case 'day':
	  paymentSum = 365 * payment;
	  break;
	case 'week':
	  paymentSum = 52 * payment;
	  break;
	case 'month':
	  paymentSum = 12 * payment;
	  break;
	case 'quater':
	  paymentSum = 4 * payment;
	  break;
	case 'year':
	  paymentSum = 1 * payment;
	  break;
	default:
	  console.log('This time range isn\'t specified')
  };

  function calculate(sum = deposit) {
	for(let i = 0; i < years; i++) {
	  sum = paymentSum * (interest / 100 + 1) + sum * (interest / 100 + 1);
	}
	return Math.floor(sum);
  }
  
  function addSpaces(num) {
	const numString = num.toString();
	const reversedString = numString.split('').reverse().join('');
	const spacedString = reversedString.replace(/(\d{3})/g, '$1 ').trim();
	return spacedString.split('').reverse().join('');
  }

  return (
  <>
	<Box sx={{ width: 400 }} >
	  <Typography variant="h4" gutterBottom>Калькулятор</Typography>
	  <Grid container columns={12} spacing={2}>
		<Grid item xs={12}>
		  <TextField
			label="Первоначальный взнос"
			id="standard-start-adornment"
			name="deposit"
			value={deposit}
			onChange={(e) => setDeposit(+e.target.value)}
			sx={{width: "100%"}}
			InputProps={{
			  startAdornment: <InputAdornment position="start">₽</InputAdornment>,
			  type: 'number',
			}}
			variant="standard"
		  />
		</Grid>
		<Grid item xs={8}>
		  <TextField
			label="Пополнение"
			id="standard-start-adornment"
			value={payment}
			onChange={(e) => setPayment(+e.target.value)}
			InputProps={{
			  startAdornment: <InputAdornment position="start">₽</InputAdornment>,
			  type: 'number',
			}}
			sx={{width: "100%"}}
			variant="standard"
		  />
		</Grid>
		<Grid item  xs={4}>
		  <FormControl sx={{width: "100%"}} variant="standard">
			<InputLabel id="demo-controlled-open-select-label">Интервал</InputLabel>
			<Select
			  labelId="demo-controlled-open-select-label"
			  id="demo-controlled-open-select"
			  open={open}
			  onClose={() => setOpen(!open)}
			  onOpen={() => setOpen(!open)}
			  value={interval}
			  label="Интервал"
			  onChange={(event) => setInterval(event.target.value)}
			>
			  <MenuItem value={'day'}>Раз в сутки</MenuItem>
			  <MenuItem value={'week'}>Раз в неделю</MenuItem>
			  <MenuItem value={'month'}>Раз в месяц</MenuItem>
			  <MenuItem value={'quater'}>Раз в квартал</MenuItem>
			  <MenuItem value={'year'}>Раз в год</MenuItem>
			</Select>
		  </FormControl>
		</Grid>
		<Grid item xs={8}>
		  <Typography id="input-slider" gutterBottom>
			Ежегодный процент
		  </Typography>
		  <Slider
			value={typeof interest === 'number' ? interest : 0}
			onChange={handleSliderChange}
			aria-labelledby="input-slider"
			valueLabelDisplay="auto"
		  />
		</Grid>
		<Grid item xs={4}>
		  <FormControl sx={{width: "100%"}} variant="standard">
			<InputLabel id="demo-controlled-open-select-label">Ставка</InputLabel>
			<Input
			  value={interest}
			  size="small"
			  sx={{width: "100%"}}
			  onChange={handleInputChange}
			  onBlur={handleBlur}
			  pattern={{}}
			  inputProps={{
				step: 1,
				min: 0,
				max: 1000,
				type: 'number',
			  }}
			/>
		  </FormControl>
		</Grid>
		<Grid item xs={8}>
		  <Typography >
			Срок инвестирования
		  </Typography>
		  <Slider
			value={typeof years === 'number' ? years : 0}
			onChange={handleYearsChange}
			valueLabelDisplay="auto"
			aria-labelledby="input-slider"
		  />
		</Grid>
		<Grid item xs={4}>
		  <FormControl sx={{width: "100%"}} variant="standard">
			<InputLabel id="demo-controlled-open-select-label">Лет</InputLabel>
			<Input
			  value={years}
			  size="small"
			  sx={{width: "100%"}}
			  onChange={handleYearsChange}
			  onBlur={handleYearsBlur}
			  inputProps={{
				step: 1,
				min: 0,
				max: 100,
				type: 'number',
			  }}
			  valueLabelDisplay="auto"
			/>
		  </FormControl>
		</Grid>
		<Grid item>
		  <Typography variant="h5">
			{`Итого: ${addSpaces(calculate())}`}
		  </Typography>
		  <Typography variant="h5">
			{`Итого: ${addSpaces(calculate())}`}
		  </Typography>
		</Grid>
	  </Grid>
	</Box>
  </>
  )
}
