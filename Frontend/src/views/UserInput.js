import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import './RunScript.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Reusable Checkbox component
const Checkbox = ({ id, label, value, setter }) => {
  const handleChange = () => {
    setter(value === 1 ? 0 : 1); // Toggle between 1 and 0
  };

  return (
    <div className="checkbox-wrapper-4 flex items-center gap-2">
      <input
        onChange={handleChange}
        checked={value === 1}
        className="inp-cbx"
        id={id}
        type="checkbox"
      />
      <label className="cbx" htmlFor={id}>
        <span>
          <svg width="12px" height="10px">
            <use href="#check-4"></use>
          </svg>
        </span>
      </label>
      <svg className="inline-svg hidden">
        <symbol id="check-4" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1" />
        </symbol>
      </svg>
      <span>{label}</span>
    </div>
  );
};

const UserInput = () => {
  const [config, setConfig] = useState(null);
  const [valuationDate, setValuationDate] = useState('');
  const [projectionTerm, setProjectionTerm] = useState('');
  const [sensitivitiesFlag, setSensitivitiesFlag] = useState(0);
  const [reinsuranceFlag, setReinsuranceFlag] = useState(0);
  const [runType, setRunType] = useState('Pricing');
  const [targetProfitMarginPricing, setTargetProfitMarginPricing] = useState('');
  const [riskDiscountRatePricing, setRiskDiscountRatePricing] = useState('');
  const [policyStart, setPolicyStart] = useState(0);
  const [policyEnd, setPolicyEnd] = useState(0);
  const [outputPath, setOutputPath] = useState('');
  const [outputCeratimCfFlag, setOutputCeratimCfFlag] = useState(0);

  // Product checkboxes
  const [baseTerm, setBaseTerm] = useState(0);
  const [gcl, setGcl] = useState(0);
  const [riderAdb, setRiderAdb] = useState(0);
  const [riderCi, setRiderCi] = useState(0);
  const [riderAtpd, setRiderAtpd] = useState(0);

  useEffect(() => {
    axios.get('/config.json')
      .then((res) => setConfig(res.data))
      .catch((err) => {
        console.error('Failed to load config:', err);
        toast.error('Failed to load configuration.');
      });
  }, []);

  const runConfiguration = async (e) => {
    e.preventDefault();

    if (!config?.apiUrlPostConfig) {
      toast.error('API URL not configured.');
      return;
    }

    const token = localStorage.getItem('jwtToken');

    const productMap = {
      'Base Term': 'BASE_TERM',
      'GCL': 'GCL',
      'Rider ADB': 'RIDER_ADB',
      'Rider CI': 'RIDER_CI',
      'Rider ATPD': 'RIDER_ATPD',
    };

    const selectedProducts = Object.entries({
      'Base Term': baseTerm,
      'GCL': gcl,
      'Rider ADB': riderAdb,
      'Rider CI': riderCi,
      'Rider ATPD': riderAtpd
    })
      .filter(([_, isSelected]) => isSelected)
      .map(([label]) => productMap[label]);

    try {
      const response = await axios.post(
        config.apiUrlPostConfig,
        {
          token,
          valuationDate,
          projectionTerm,
          sensitivitiesFlag: sensitivitiesFlag === 1,
          reinsuranceFlag: reinsuranceFlag === 1,
          runType,
          targetProfitMarginPricing,
          riskDiscountRatePricing,
          policyStart: policyStart.toString(),
          policyEnd: policyEnd.toString(),
          outputPath,
          outputSeriatimFlag: outputCeratimCfFlag === 1,
          selectedProducts,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { pythonResponse } = response.data;

      const pythonStatus = typeof pythonResponse === 'string' ? JSON.parse(pythonResponse) : pythonResponse;

      if (pythonStatus.status === 'success') {
        toast.success('Configuration run successful!');
        setValuationDate('');
        setProjectionTerm('');
        setSensitivitiesFlag(0);
        setReinsuranceFlag(0);
        setRunType('Pricing');
        setTargetProfitMarginPricing('');
        setRiskDiscountRatePricing('');
        setPolicyStart(0);
        setPolicyEnd(0);
        setOutputPath('');
        setOutputCeratimCfFlag(0);
        setBaseTerm(0);
        setGcl(0);
        setRiderAdb(0);
        setRiderCi(0);
        setRiderAtpd(0);
      } else {
        toast.warn('Python backend failed. Please check logs.');
      }
    } catch (error) {
      console.error('Config error:', error);
      toast.error('Please try again in some time');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-6 w-full">
            {/* Products Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Checkbox id="baseTerm" label="Base Term" value={baseTerm} setter={setBaseTerm} />
                <Checkbox id="gcl" label="GCL" value={gcl} setter={setGcl} />
                <Checkbox id="riderAdb" label="Rider ADB" value={riderAdb} setter={setRiderAdb} />
                <Checkbox id="riderCi" label="Rider CI" value={riderCi} setter={setRiderCi} />
                <Checkbox id="riderAtpd" label="Rider ATPD" value={riderAtpd} setter={setRiderAtpd} />
              </div>
              <hr />
            </div>

            {/* Configuration Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Configuration Data</h2>
              <div className="space-y-4">
                <TextField
                  fullWidth
                  type="date"
                  label="Valuation Date"
                  variant="outlined"
                  size="small"
                  value={valuationDate}
                  onChange={(e) => setValuationDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="Projection Term"
                  variant="outlined"
                  size="small"
                  value={projectionTerm}
                  onChange={(e) => setProjectionTerm(e.target.value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Checkbox id="sensitivitiesFlag" label="Sensitivities Flag" value={sensitivitiesFlag} setter={setSensitivitiesFlag} />
                  <Checkbox id="reinsuranceFlag" label="Reinsurance Flag" value={reinsuranceFlag} setter={setReinsuranceFlag} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Run Type</label>
                  <select
                    id="runTypeDropdown"
                    className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-sky-500"
                    value={runType}
                    onChange={(e) => setRunType(e.target.value)}
                  >
                    <option value="Pricing">Pricing</option>
                    <option value="Valuation">Valuation</option>
                    <option value="BusinessPlanning">BusinessPlanning</option>
                    <option value="CRNHR">CRNHR</option>
                    <option value="IFRS">IFRS</option>
                  </select>
                </div>
                <TextField
                  fullWidth
                  label="Target Profit Margin Pricing"
                  variant="outlined"
                  size="small"
                  value={targetProfitMarginPricing}
                  onChange={(e) => setTargetProfitMarginPricing(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Risk Discount Rate Pricing"
                  variant="outlined"
                  size="small"
                  value={riskDiscountRatePricing}
                  onChange={(e) => setRiskDiscountRatePricing(e.target.value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Checkbox id="policyStart" label="Policy Start" value={policyStart} setter={setPolicyStart} />
                  <Checkbox id="policyEnd" label="Policy End" value={policyEnd} setter={setPolicyEnd} />
                </div>
                <TextField
                  fullWidth
                  label="Output Path"
                  variant="outlined"
                  size="small"
                  value={outputPath}
                  onChange={(e) => setOutputPath(e.target.value)}
                />
                <Checkbox
                  id="outputCeratimCfFlag"
                  label="Output Seratim CF Flag"
                  value={outputCeratimCfFlag}
                  setter={setOutputCeratimCfFlag}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={runConfiguration}
                disabled={!config}
                className="text-white bg-[#32bef0] rounded-md px-6 py-2 hover:bg-sky-500 disabled:bg-gray-300 disabled:text-gray-600"
              >
                Run Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserInput;
