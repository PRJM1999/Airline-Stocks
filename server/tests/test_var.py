import pandas as pd
import numpy as np
import pytest
from api.var_model import VARModel

@pytest.fixture
def var_model():
    return VARModel(maxlags=2)

def test_var_fit(var_model):
    data = pd.DataFrame({'a': np.random.normal(size=100), 'b': np.random.normal(size=100)})
    var_model.fit(data)
    assert hasattr(var_model, 'fitted_model')
    assert hasattr(var_model, 'optimal_lag_order')
