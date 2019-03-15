import test from 'ava';
import getObjectWithAttributesThatChanged from '.';
test('get object with attributes that changed', t => {
    t.deepEqual(
        getObjectWithAttributesThatChanged(
            {
                hello: 22,
                other: 23
            },
            {
                hello: 22,
                other: 24
            }
        ),
        {
            other: 24
        }
    );
});

test('more complex object', t => {
    t.deepEqual(
        getObjectWithAttributesThatChanged(
            {
                components: ['DAQ', 'DT', 'TCDS'],
                l1_hlt_mode_stripped: null,
                l1_key: null,
                duration: 339,
                b_field: 0.019,
                tier0_transfer: true,
                l1_triggers_counter: null,
                hlt_physics_throughput: null,
                init_lumi: 0,
                last_update: '2019-01-18T21:28:23Z',
                delivered_lumi: 0,
                recorded_lumi: 0,
                cmssw_version: 'CMSSW_10_1_2_patch2',
                energy: null,
                end_lumi: 0,
                hlt_physics_rate: null,
                fill_number: null,
                l1_hlt_mode: null,
                end_time: '2019-01-18T19:59:01Z',
                trigger_mode: 'MANUAL',
                l1_key_stripped: null,
                fill_type_party2: null,
                fill_type_party1: null,
                initial_prescale_index: null,
                sequence: 'PRIVATE-GLOBAL-DT',
                start_time: '2019-01-18T19:53:22Z',
                hlt_physics_size: 0.013,
                fill_type_runtime: null,
                hlt_key: '/minidaq/2017/Basic/HLT/V4',
                clock_type: 'LOCAL',
                l1_rate: null,
                l1_menu: null,
                run_number: 328025,
                stable_beam: false,
                hlt_physics_counter: 12282
            },
            {
                components: ['DAQ', 'DT', 'ECAL', 'EGAMMA', 'TCDS'],
                l1_hlt_mode_stripped: null,
                l1_key: null,
                duration: 339,
                b_field: 0.019,
                tier0_transfer: true,
                l1_triggers_counter: null,
                hlt_physics_throughput: null,
                init_lumi: 0,
                last_update: '2019-01-18T21:28:23Z',
                delivered_lumi: 0,
                recorded_lumi: 0,
                cmssw_version: 'CMSSW_10_1_2_patch2',
                energy: undefined,
                end_lumi: 0,
                hlt_physics_rate: null,
                fill_number: null,
                l1_hlt_mode: null,
                end_time: '2019-01-18T19:59:01Z',
                trigger_mode: 'MANUAL',
                l1_key_stripped: null,
                fill_type_party2: null,
                fill_type_party1: null,
                initial_prescale_index: null,
                sequence: 'PRIVATE-GLOBAL-DT',
                start_time: '2019-01-18T19:53:22Z',
                hlt_physics_size: 0.013,
                fill_type_runtime: null,
                hlt_key: '/minidaq/2017/Basic/HLT/V4',
                clock_type: 'LOCAL',
                l1_rate: null,
                l1_menu: null,
                run_number: 328025,
                stable_beam: true,
                hlt_physics_counter: 12283
            }
        ),
        {
            components: ['DAQ', 'DT', 'ECAL', 'EGAMMA', 'TCDS'],
            stable_beam: true,
            hlt_physics_counter: 12283,
            energy: undefined
        }
    );
});

test('with same number of components, but different', t => {
    t.deepEqual(
        getObjectWithAttributesThatChanged(
            {
                components: ['DAQ', 'DT', 'TCDS'],
                l1_hlt_mode_stripped: null
            },
            {
                components: ['DAQ', 'ECAL', 'TCDS'],
                l1_hlt_mode_stripped: null
            }
        ),
        {
            components: ['DAQ', 'ECAL', 'TCDS']
        }
    );
});

test('with nested object', t => {
    t.deepEqual(
        getObjectWithAttributesThatChanged(
            {
                components: ['DAQ', 'DT', 'TCDS'],
                l1_hlt_mode_stripped: null,
                inside_object: {
                    inside_property: 1,
                    inside_property: 2
                }
            },
            {
                components: ['DAQ', 'DT', 'TCDS'],
                l1_hlt_mode_stripped: null,
                inside_object: {
                    inside_property: 1,
                    inside_property: 3
                }
            }
        ),
        {
            inside_object: {
                inside_property: 1,
                inside_property: 3
            }
        }
    );
});

test('with array that doesnt change', t => {
    t.deepEqual(
        getObjectWithAttributesThatChanged(
            ['DAQ', 'DT', 'TCDS'],
            ['DAQ', 'DT', 'TCDS']
        ),
        []
    );
});

test('with array that changes', t => {
    t.deepEqual(
        getObjectWithAttributesThatChanged(
            ['DAQ', 'DT'],
            ['DAQ', 'DT', 'TCDS']
        ),
        ['TCDS']
    );
});

test('with object with new properties', t => {
    t.deepEqual(
        getObjectWithAttributesThatChanged(
            { hello: 'hello', changed_value: 'first', other_value: 'other' },
            {
                hello: 'hello',
                changed_value: 'second',
                extra_value: 'should appear'
            }
        ),
        {
            changed_value: 'second',
            extra_value: 'should appear'
        }
    );
});
