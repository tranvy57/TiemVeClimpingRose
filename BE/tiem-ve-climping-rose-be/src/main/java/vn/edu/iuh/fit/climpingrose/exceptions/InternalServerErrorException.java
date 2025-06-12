package vn.edu.iuh.fit.climpingrose.exceptions;

public class InternalServerErrorException extends RuntimeException {
    public InternalServerErrorException(String message) {
        super(message);
    }

    public InternalServerErrorException(RuntimeException message) {
        super(message.getMessage());
    }
}
