package vn.edu.iuh.fit.climpingrose.services;

import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.climpingrose.dtos.TestDto;
import vn.edu.iuh.fit.climpingrose.exceptions.BadRequestException;

@Service
public class TestService {

    public TestDto getTestDto() {
        throw new BadRequestException("Test exception");
    }
}
