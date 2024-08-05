package org.reservation.carsharingapi.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class ImageController {

    @Value("${images.path}")
    private String imagesPath;

    private static final Logger logger = LoggerFactory.getLogger(ImageController.class);

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Resource file = new FileSystemResource(imagesPath + filename);
            if (!file.exists()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");
            }
            return ResponseEntity.ok().body(file);
        } catch (Exception e) {
            logger.error("Error occurred while serving file", e.getCause());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while serving file", e);
        }
    }
}
