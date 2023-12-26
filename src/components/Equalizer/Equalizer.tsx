import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

import { FREQUENCIES, musicPreset } from './config';
import RangeItem from './RangeItem';

import { device } from '../../device';
import { useLangs } from '../../hooks/useLangs';
import { Select } from '../UI';

const StyledEqualizer = styled.section`
  position: fixed;
  z-index: 99;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: space-around;

  background: #0f0f0f;
  border-radius: 15px;

  @media ${device.mobileL} {
    width: 100%;
  }
`;

const StyledRangeContainer = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
`;

interface EqualizerProps {
  streams: MediaStream[];
  onClose?: () => void;
}

const Equalizer: React.FC<EqualizerProps> = ({ streams, onClose }) => {
  const [filters, setFilters] = useState<BiquadFilterNode[]>([]);
  const [presets, setPresets] = useState(musicPreset.flat);
  const langs = useLangs();

  useEffect(() => {
    let source: MediaStreamAudioSourceNode | undefined;

    if (streams.length > 0) {
      const createFilter = function (frequency: number) {
        const filter = context.createBiquadFilter();

        filter.type = 'peaking'; // тип фильтра
        filter.frequency.value = frequency; // частота
        filter.Q.value = 1; // Q-factor
        filter.gain.value = 0;

        return filter;
      };

      const createFilters = function () {
        const filters = FREQUENCIES.map(createFilter);

        filters.reduce(function (prev, curr) {
          prev.connect(curr);
          return curr;
        });

        return filters;
      };

      const context = new AudioContext();
      source = context.createMediaStreamSource(streams[0]);
      const filters = createFilters();
      source.connect(filters[0]);
      filters[filters.length - 1].connect(context.destination);
      setFilters(filters);
    }
    return () => {
      source && source.disconnect();
    };
  }, []);

  useEffect(() => {
    filters.forEach((f, i) => (f.gain.value = presets[i]));
  }, [presets]);

  const options = useMemo(
    () =>
      Object.keys(musicPreset).map((key) => {
        return {
          name: langs(key),
          value: key,
        };
      }),
    [musicPreset]
  );

  const changeFrequencieValue = useCallback(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      const frequencie = Number(e.currentTarget.dataset.frequencie);
      const value = Number(e.currentTarget.value);
      setPresets((p) =>
        p.map((val, i) => (i === FREQUENCIES.indexOf(frequencie) ? value : val))
      );
    },
    [FREQUENCIES]
  );

  const changePreset = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const key = e.currentTarget.value as keyof typeof musicPreset;
      setPresets(musicPreset[key]);
    },
    []
  );

  return (
    <StyledEqualizer>
      <h3>{langs('Equalizer')}</h3>
      <Select
        title={langs('Presets')}
        options={options}
        onChange={changePreset}
      />
      <StyledRangeContainer>
        {FREQUENCIES.map((freq, i) => (
          <RangeItem
            key={freq}
            min={-10}
            max={10}
            frequencie={freq}
            value={presets[i]}
            onChange={changeFrequencieValue}
          />
        ))}

        <datalist id='steplist'>
          <option>-12</option>
          <option>-9</option>
          <option>-6</option>
          <option>-3</option>
          <option>0</option>
          <option>3</option>
          <option>6</option>
          <option>9</option>
          <option>12</option>
        </datalist>
      </StyledRangeContainer>
      <Button onClick={onClose} variant='primary'>
        {langs('Close')}
      </Button>
    </StyledEqualizer>
  );
};

export default Equalizer;
